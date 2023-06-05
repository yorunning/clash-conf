import base64
import functools
import os
from typing import Callable, Final

import requests
import yaml


def get_abspath(path: str) -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), path))


def url_base64_encode(url: str) -> str:
    return base64.b64encode(url.encode("utf-8")).decode("utf-8")


"""
文档地址: https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%A7%84%E5%88
%99%E8%BD%AC%E6%8D%A2
接口示例: https://sub.xeton.dev/getruleset?type=3&url=aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0
FDTDRTU1IvQUNMNFNTUkBtYXN0ZXIvQ2xhc2gvTG9jYWxBcmVhTmV0d29yay5saXN0
转换类型: 3->domain rule, 4->ipcidr rule
"""
CONV_INTERFACE: Final[str] = "https://sub.xeton.dev/getruleset?"
CONV_TYPES: Final[tuple[int, int]] = (3, 4)
OUTPUT_DIR: Final[str] = get_abspath("../rule/")
OUTPUT_FILE: Final[str] = get_abspath("./rule-providers.yaml")


def init(func: Callable) -> Callable:
    """Clean up existing output"""

    @functools.wraps(func)
    def wrapper(*args, **kw):
        if os.path.exists(OUTPUT_DIR):
            for filename in os.listdir(OUTPUT_DIR):
                os.remove(os.path.join(OUTPUT_DIR, filename))
        else:
            os.mkdir(OUTPUT_DIR)

        if os.path.exists(OUTPUT_FILE):
            os.remove(OUTPUT_FILE)

        return func(*args, **kw)

    return wrapper


def convert_ruleset() -> list[str]:
    ruleset_url_list: list[str] = []
    ruleset_name_list: list[str] = []

    # Read the ruleset URL from `ruleset-url.txt`
    with open(get_abspath("./ruleset-url.txt"), "r") as fr:
        ruleset_url_list.extend(map(lambda x: x.rstrip("\n"), fr.readlines()))

    for ruleset_url in ruleset_url_list:
        ruleset_name_prefix: str = ruleset_url.split("/")[-1].split(".")[0]

        for conv_type in CONV_TYPES:
            ruleset_name_suffix: str = "domain" if conv_type == 3 else "ipcidr"

            request_url: str = "{}type={}&url={}".format(
                CONV_INTERFACE, str(conv_type), url_base64_encode(ruleset_url)
            )
            response_content: bytes = requests.get(request_url).content

            # Skip ruleset with empty content
            if response_content != b"payload:\n  - '0.0.0.0/32'":
                ruleset_name: str = "_".join([ruleset_name_prefix, ruleset_name_suffix])
                ruleset_name_list.append(ruleset_name)

                with open(os.path.join(OUTPUT_DIR, ruleset_name + ".yaml"), "wb") as fw:
                    fw.write(response_content)
                print("{} <- {}.yaml".format(OUTPUT_DIR, ruleset_name))

    return ruleset_name_list


def generate_rule_providers(ruleset_name_list: list[str]) -> None:
    rule_providers_items: dict[str, dict[str, str | int]] = {}
    rule_providers = {"rule-providers": rule_providers_items}

    for ruleset_name in ruleset_name_list:
        # rule-providers template
        rule_providers_items[ruleset_name] = {
            "type": "http",
            "behavior": ruleset_name.split("_")[-1],
            "url": "".join(
                [
                    "https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/rule/",
                    ruleset_name,
                    ".yaml",
                ]
            ),
            "path": "./ruleset/{}.yaml".format(ruleset_name),
            "interval": 86400,
        }

    # Convert dict to yaml
    rule_providers_content: str = yaml.dump(rule_providers, sort_keys=False).replace(
        "86400", "86400\n"
    )

    with open(OUTPUT_FILE, "w") as fw:
        fw.write(rule_providers_content)
    print("{} <- {}".format(*os.path.split(OUTPUT_FILE)))


@init
def main(is_generate_rule_providers: bool = True) -> None:
    if is_generate_rule_providers:
        ruleset_name_list = convert_ruleset()
        generate_rule_providers(ruleset_name_list)
    else:
        convert_ruleset()


if __name__ == "__main__":
    main(False)

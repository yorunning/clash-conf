import base64
import functools
import os
from typing import Callable, Final

import requests
import yaml

"""
文档地址: https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%A7%84%E5%88
%99%E8%BD%AC%E6%8D%A2
接口示例: https://sub.xeton.dev/getruleset?type=3&url=https://sub.xeton.dev/getruleset?type=
3&url=aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0FDTDRTU1IvQUNMNFNTUkBtYXN0ZXIvQ2xhc2gvTG9jYW
xBcmVhTmV0d29yay5saXN0
转换类型: 3->domain rule, 4->ipcidr rule
"""


def get_abspath(path: str) -> str:
    current_dirpath: str = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(current_dirpath, path)


def url_base64_encode(url: str) -> str:
    """将string格式的url编码为base64格式的url"""
    return base64.b64encode(url.encode('utf-8')).decode('utf-8')


CONV_INTERFACE: Final[str] = 'https://sub.xeton.dev/getruleset?'
CONV_TYPE: Final[tuple[int, int]] = (3, 4)
TARGET_DIR: Final[str] = get_abspath('../rule/')
TARGET_FILE: Final[str] = get_abspath('./rule-providers.yaml')


def init(func: Callable) -> Callable:
    """初始化检查,清理已存在的rule、rule-providers"""

    @functools.wraps(func)
    def wrapper(*args, **kw):
        if os.path.exists(TARGET_DIR):
            for filename in os.listdir(TARGET_DIR):
                os.remove(os.path.join(TARGET_DIR, filename))
        else:
            os.mkdir(TARGET_DIR)

        if os.path.exists(TARGET_FILE):
            os.remove(TARGET_FILE)

        return func(*args, **kw)

    return wrapper


@init
def main(generate_rule_providers: bool = True) -> None:
    ruleset_url_list: list[str] = []
    ruleset_name_list: list[str] = []

    # 从ruleset-url.txt读取ruleset url
    with open(get_abspath('./ruleset-url.txt'), 'r') as fr:
        ruleset_url_list.extend(map(lambda x: x.rstrip('\n'), fr.readlines()))

    # 通过转换接口生成ruleset content并保存到TARGET_DIR
    for ruleset_url in ruleset_url_list:
        ruleset_name_prefix: str = ruleset_url.split('/')[-1].split('.')[0]

        for TYPE in CONV_TYPE:
            ruleset_name_suffix: str = 'domain' if TYPE == 3 else 'ipcidr'

            # 拼接base64预处理url
            request_url = '{}type={}&url={}'.format(
                CONV_INTERFACE, str(TYPE), url_base64_encode(ruleset_url)
            )

            # 下载转换后的ruleset content
            response_content: bytes = requests.get(request_url).content

            # 跳过内容为空的ruleset
            if response_content != b"payload:\n  - '0.0.0.0/32'":
                # 拼接ruleset name
                ruleset_name: str = '_'.join([ruleset_name_prefix, ruleset_name_suffix])
                ruleset_name_list.append(ruleset_name)

                # 保存ruleset content
                with open(
                    os.path.join(TARGET_DIR, ruleset_name) + '.yaml', 'wb'
                ) as fw:
                    fw.write(response_content)

    # 生成rule-providers并保存到TARGET_FILE
    if generate_rule_providers is True:
        dump: dict[str, dict[str, str | int]] = {}
        root: dict[str, dict] = {'rule-providers': dump}

        for ruleset_name in ruleset_name_list:
            # rule-providers模板
            dump[ruleset_name] = {
                'type': 'http',
                'behavior': ruleset_name.split('_')[-1],
                'url': ''.join(
                    [
                        'https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/rule/',
                        ruleset_name,
                        '.yaml',
                    ]
                ),
                'path': './ruleset/{}.yaml'.format(ruleset_name),
                'interval': 86400,
            }

        # dict转换为yaml格式
        rule_providers_content: str = yaml.dump(root, sort_keys=False).replace(
            '86400', '86400\n'
        )
        # 保存rule-providers
        with open(TARGET_FILE, 'w') as fw:
            fw.write(rule_providers_content)


if __name__ == '__main__':
    main()
    # p: str = os.path.dirname(os.path.abspath(__file__))
    # print(p)
    # print(os.path.abspath(get_abspath('../rule')))

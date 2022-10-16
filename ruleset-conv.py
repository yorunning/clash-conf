import os
import base64
import requests
import yaml


"""
文档地址: https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%A7%84%E5%88%99%E8%BD%AC%E6%8D%A2
接口示例: https://sub.xeton.dev/getruleset?type=4&url=https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list
转换类型: 3->domain rule, 4->ipcidr rule
"""
conv_interface = 'https://sub.xeton.dev/getruleset?'
conv_type = (3, 4)
target_dir = './rule/'
target_file = './rule-providers.yaml'


def url_base64_encode(url):
    return base64.b64encode(url.encode('utf-8')).decode('utf-8')


def main(generate_rule_providers=True):
    rule_url_list = []
    rule_name_list = []

    # 初始化检查，清理已存在的rule、rule-providers
    if os.path.exists(target_dir):
        for target_filename in os.listdir(target_dir):
            os.remove(os.path.join(target_dir, target_filename))
    else:
        os.mkdir(target_dir)

    if os.path.exists(target_file):
        os.remove(target_file)

    # 读取rule url
    with open('./rule-url.txt', 'r') as fr:
        rule_url_list = list(map(lambda x: x.rstrip('\n'), fr.readlines()))

    # 生成并保存rule set
    for rule_url in rule_url_list:
        rule_name_prefix = rule_url.split('/')[-1].split('.')[0]

        for type in conv_type:
            # 拼接base64预处理url
            request_url = '{}type={}&url={}'.format(
                conv_interface, str(type), url_base64_encode(rule_url)
            )

            # 下载转换后的rule
            response_content = requests.get(request_url).content

            # 跳过内容为空的规则集
            if response_content != b"payload:\n  - '0.0.0.0/32'":
                # 拼接rule name
                rule_name_suffix = '_domain' if type == 3 else '_ipcidr'
                rule_name = rule_name_prefix + rule_name_suffix
                rule_name_list.append(rule_name)

                # 保存rule
                with open(os.path.join(target_dir, rule_name) + '.yaml', 'wb') as fw:
                    fw.write(response_content)

    if generate_rule_providers is True:
        # 生成并保存rule-providers
        dump = {}
        for name in rule_name_list:
            # rule-providers模板
            dump[name] = {
                'type': 'http',
                'behavior': name.split('_')[-1],
                'url': 'https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/rule/%s.yaml'
                % name,
                'interval': 86400,
            }
        root = {'rule-providers': dump}

        # 生成rule-providers文本并保存
        rule_providers_content = yaml.dump(root, sort_keys=False).replace(
            '86400', '86400\n'
        )

        with open(target_file, 'w') as fw:
            fw.write(rule_providers_content)


if __name__ == '__main__':
    main(False)

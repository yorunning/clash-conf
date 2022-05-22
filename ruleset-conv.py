import os
import shutil
import base64
import requests
import yaml

# https://sub.xeton.dev/getruleset?\
# type=4\
# &url=https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list

"""
文档地址：https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%A7%84%E5%88%99%E8%BD%AC%E6%8D%A2
接口示例：https://sub.xeton.dev/getruleset?type=4&url=https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list
转换类型：3->domain rule-provider
        4->ipcidr rule-provider
"""
conv_interface = 'https://sub.xeton.dev/getruleset?'
conv_type = (3, 4)
target_dir = './rule/'
target_rule_providers = './rule-providers.yaml'


def url_base64_encode(url):
    return base64.b64encode(url.encode('utf-8')).decode('utf-8')


def main():
    url_list = []
    name_list = []

    """清理已存在的target文件夹"""
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
        os.mkdir(target_dir)
    else:
        os.mkdir(target_dir)

    if os.path.exists(target_rule_providers):
        os.remove(target_rule_providers)

    """读取url"""
    with open('./url.txt', 'r') as fr:
        url_list = list(map(lambda x: x.rstrip('\n'), fr.readlines()))

    """生成并保存rule-set"""
    for url in url_list:
        name_prefix = url.split('/')[-1].split('.')[0]

        for type in conv_type:
            # 拼接dump64预处理url
            prepro_url = (
                conv_interface + 'type=' + str(type) + '&url=' + url_base64_encode(url)
            )

            # 下载转换后的rule-set
            response_content = requests.get(prepro_url).content

            # 清除内容为空的规则集
            if response_content != b"payload:\n  - '0.0.0.0/32'":

                name_suffix = '_domain' if type == 3 else '_ipcidr'
                name = name_prefix + name_suffix
                name_list.append(name)

                # 保存rule-set
                with open(target_dir + name + '.yaml', 'wb') as fw:
                    fw.write(response_content)

    # show rule-set in cli
    print(name_list)

    """生成并保存rule-providers"""
    dump = {}
    for name in name_list:
        # rule-providers模板
        dump[name] = {
            'type': 'http',
            'behavior': name.split('_')[-1],
            'url': r'"https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/rule/%s.yaml"'
            % name,
            'path': './ruleset/%s.yaml' % name,
            'interval': 86400,
        }
        # 保存rule-providers
        with open(target_rule_providers, 'a') as fw:
            fw.write(yaml.dump(dump, sort_keys=False))
            fw.write('\n')
        dump = {}

    # 处理字符串fix
    with open(target_rule_providers, 'r') as fr:
        all_text = fr.read().replace("'", '')
    with open(target_rule_providers, 'w') as fw:
        fw.write(all_text)


if __name__ == '__main__':
    main()

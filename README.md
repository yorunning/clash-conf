- [Clash 配置](#clash-配置)
    - [订阅转换配置文件](#订阅转换配置文件)
    - [一键订阅转换链接](#一键订阅转换链接)
- [Stash 配置](#stash-配置)
  - [用法 1.订阅转换](#用法-1订阅转换)
    - [订阅转换配置文件](#订阅转换配置文件-1)
    - [一键订阅转换链接](#一键订阅转换链接-1)
  - [用法 2.配置文件导入（推荐）](#用法-2配置文件导入推荐)
    - [Stash 配置文件](#stash-配置文件)
    - [使用步骤](#使用步骤)
- [免流](#免流)
    - [订阅转换配置文件](#订阅转换配置文件-2)
    - [使用步骤](#使用步骤-1)
- [其他资源](#其他资源)
    - [文档](#文档)
    - [规则](#规则)
    - [subconverter 接口](#subconverter-接口)
    - [在线订阅转换页面](#在线订阅转换页面)

### Clash 配置

##### 订阅转换配置文件

[https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/clash/clash.ini](https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/clash/clash.ini)

##### 一键订阅转换链接

```
https://sub.xeton.dev/sub?target=clash&config=https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/clash/clash.ini&udp=true&filename=[sub_name]&url=[sub_url]
```

_（修改 filename & url）_

### Stash 配置

#### 用法 1.订阅转换

##### 订阅转换配置文件

[https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash.ini](https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash.ini)

##### 一键订阅转换链接

```
https://sub.xeton.dev/sub?target=clash&config=https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash.ini&udp=true&filename=[sub_name]&url=[sub_url]
```

_（修改 filename & url）_

#### 用法 2.配置文件导入（推荐）

##### Stash 配置文件

[https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash.yaml](https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash.yaml)

##### 使用步骤

a.下载配置文件

b.机场订阅链接填写至[subscribe-url](https://github.com/yorunning/clash_conf/blob/main/stash/stash.yaml#L10)字段

c.机场订阅链接补充至[url](https://github.com/yorunning/clash_conf/blob/main/stash/stash.yaml#L15)字段链接中的 url 参数

### 免流

##### 订阅转换配置文件

[https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash_ml.ini](https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash_ml.ini)

##### 使用步骤

a.修改机场节点的混淆参数以及筛选端口([修改混淆页面](https://host.elkcloud.cf/))

b.将上一步骤生成的链接进行 url 编码([url 编码页面](http://www.urlencode.com.cn/))

c.拼接最终订阅转换链接，修改 filename & url(上一步骤编码后的 url)

```
https://sub.xeton.dev/sub?target=clash&config=https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/stash/stash_ml.ini&udp=true&filename=[sub_name]&url=[sub_url]
```

### 其他资源

##### 文档

[Clash 文档](https://lancellc.gitbook.io/clash/)|
[CFW 文档](https://docs.cfw.lbyczf.com/)|
[Stash 文档](https://stash.wiki/)|
[subconverter 文档](https://github.com/tindy2013/subconverter/blob/master/README-cn.md)

##### 规则

[ACL4SSR 规则](https://github.com/ACL4SSR/ACL4SSR/tree/master/Clash)|
[Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules)|
[Infatuation-Fei/rule](https://github.com/Infatuation-Fei/rule)

##### subconverter 接口

subconverter 作者提供：[https://sub.xeton.dev/sub?](https://sub.xeton.dev/sub?)

sub-web 作者提供：[https://api.wcc.best/sub?](https://api.wcc.best/sub?)

##### 在线订阅转换页面

sub-web 作者提供：[https://sub-web.netlify.app/](https://sub-web.netlify.app/)

ACL4SSR 作者提供：[https://acl4ssr-sub.github.io/](https://acl4ssr-sub.github.io/)

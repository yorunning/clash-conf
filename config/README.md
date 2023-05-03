## clash.ini vs stash.ini vs stash.yaml

### 相同点

规则匹配、策略组和节点筛选的设置是一样的，只是规则数量不同。

### 不同点

clash.ini: 增强广告拦截、隐私防护及完整 GFW 代理列表，总规则 4.5W 条，适合 PC 端使用（不受性能、功耗限制）。

stash.ini: 精简广告拦截，总规则 8.5K 条，适合移动端使用（减少规则匹配，节省功耗）。

stash.yaml: 规则与 stash.ini 一样，使用 yaml 配置可以设置 Stash 策略组独有的`icon`属性，更加美观。

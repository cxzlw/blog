---
title: 记MC服务器性能调优
date: 2023-07-08 00:41:26
# excerpt: ""
tags: 
 - Zerotier
 - 自建Planet
 - cxzlw
license: "BY-NC-SA"
author: "cxzlw"
---

{% note warning %}
该系列文章旨在记录我对服务器进行的某些优化。但我所进行的所谓优化不一定是正确的，甚至可能是错误的，将造成巨大后果的。因此，对待此系列文章务必谨慎。同时欢迎纠正我的错误。（轻点喷）
{% endnote %}

好友开服，与 [anmouren](https://blog.cxzlw.top/tags/%E8%B7%AF%E8%BF%87%E7%9A%84%E6%9F%90%E4%B8%AA%E5%AD%A6%E6%B8%A3/) 等人在服里修了一座又一座的机器，还有 24h 挂机的假人，服务器 tps 低下。本文旨在尽可能不影响游戏体验（特别是机器）的前提下对其服务器进行优化。

## 一、本文要进行的修改

为服务器安装 [Spark](https://spark.lucko.me/) 插件，运行下列命令：

```
/spark profiler start --only-ticks-over 60
```

同时激活影响 tps 的各种因素，如猪人塔，沼泽刷怪塔等。待收集数据后，运行下列命令：

```
/spark profiler stop
```

随后，打开获得的性能分析文件进行分析：

![性能分析](../imgs/image-2.png)

观察到 EntityZombie.tick() 和 EntityVillager.inactiveTick()，那我们今天就在这个地方砍一刀，我们的办法是让这个方法（或者里面的方法）有概率的不执行。

## 二、对代码动刀子

使用 BuildTool 

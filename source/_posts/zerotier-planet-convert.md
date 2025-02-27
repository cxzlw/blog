---
title: Zerotier 自定义 Planet 后与标准节点互通
date: 2023-07-06 12:37:41
excerpt: "由于国内特殊的网络原因，Zerotier 官方提供的 Planet 用户体验不佳。为此，不少人选择自建私有 Moon，甚至私有 Planet 服务器。然而，正如官方文档所说，使用私有 Planet 服务器会使你的节点无法找到其他的标准节点。本文试图提出一种方案在使用私有 Planet 服务器的同时与标准节点通信。"
tags:
    - Zerotier
    - 自建 Planet
    - cxzlw
license: "BY"
author: "cxzlw"
---

由于国内特殊的网络原因[^1]，Zerotier 官方提供的 Planet 用户体验不佳。为此，不少人选择自建私有 Moon，甚至私有 Planet 服务器。然而，正如官方文档[^2]所说，使用私有 Planet 服务器会使你的节点无法找到其他的标准节点。本文试图提出一种方案在使用私有 Planet 服务器的同时与标准节点通信。

## 一、生成 moon.json

这步主要是为了一个模板：

```batch
cd C:\ProgramData\ZeroTier\One
zerotier-idtool initmoon identity.public >> planet.json
```

得到的 json：

```json
{
    "id": "xxx",
    "objtype": "world",
    "roots": [
        {
            "identity": "xxx",
            "stableEndpoints": []
        }
    ],
    "signingKey": "xxx",
    "signingKey_SECRET": "xxx",
    "updatesMustBeSignedBy": "xxx",
    "worldType": "moon"
}
```

## 二、获得官方 Planet 的 identity 和 stableEndpoints

使用以下代码（照着 attic/world/mkworld.cpp 和 node/Topology.cpp 改的）

```cpp
#include <iostream>
#include <node/C25519.hpp>
#include <node/Identity.hpp>
#include <node/InetAddress.hpp>
#include <node/World.hpp>

#define ZT_DEFAULT_WORLD_LENGTH 570 // 这俩行来自 Topology.cpp
static const unsigned char ZT_DEFAULT_WORLD[ZT_DEFAULT_WORLD_LENGTH] = {0x01,0x00,0x00,0x00,0x00,0x08,0xea,0xc9,0x0a,0x00,0x00,0x01,0x7e,0xe9,0x57,0x60,0xcd,0xb8,0xb3,0x88,0xa4,0x69,0x22,0x14,0x91,0xaa,0x9a,0xcd,0x66,0xcc,0x76,0x4c,0xde,0xfd,0x56,0x03,0x9f,0x10,0x67,0xae,0x15,0xe6,0x9c,0x6f,0xb4,0x2d,0x7b,0x55,0x33,0x0e,0x3f,0xda,0xac,0x52,0x9c,0x07,0x92,0xfd,0x73,0x40,0xa6,0xaa,0x21,0xab,0xa8,0xa4,0x89,0xfd,0xae,0xa4,0x4a,0x39,0xbf,0x2d,0x00,0x65,0x9a,0xc9,0xc8,0x18,0xeb,0x36,0x00,0x92,0x76,0x37,0xef,0x4d,0x14,0x04,0xa4,0x4d,0x54,0x46,0x84,0x85,0x13,0x79,0x75,0x1f,0xaa,0x79,0xb4,0xc4,0xea,0x85,0x04,0x01,0x75,0xea,0x06,0x58,0x60,0x48,0x24,0x02,0xe1,0xeb,0x34,0x20,0x52,0x00,0x0e,0x62,0x90,0x06,0x1a,0x9b,0xe0,0xcd,0x29,0x3c,0x8b,0x55,0xf1,0xc3,0xd2,0x52,0x48,0x08,0xaf,0xc5,0x49,0x22,0x08,0x0e,0x35,0x39,0xa7,0x5a,0xdd,0xc3,0xce,0xf0,0xf6,0xad,0x26,0x0d,0x58,0x82,0x93,0xbb,0x77,0x86,0xe7,0x1e,0xfa,0x4b,0x90,0x57,0xda,0xd9,0x86,0x7a,0xfe,0x12,0xdd,0x04,0xca,0xfe,0x9e,0xfe,0xb9,0x00,0xcc,0xde,0xf7,0x6b,0xc7,0xb9,0x7d,0xed,0x90,0x4e,0xab,0xc5,0xdf,0x09,0x88,0x6d,0x9c,0x15,0x14,0xa6,0x10,0x03,0x6c,0xb9,0x13,0x9c,0xc2,0x14,0x00,0x1a,0x29,0x58,0x97,0x8e,0xfc,0xec,0x15,0x71,0x2d,0xd3,0x94,0x8c,0x6e,0x6b,0x3a,0x8e,0x89,0x3d,0xf0,0x1f,0xf4,0x93,0xd1,0xf8,0xd9,0x80,0x6a,0x86,0x0c,0x54,0x20,0x57,0x1b,0xf0,0x00,0x02,0x04,0x68,0xc2,0x08,0x86,0x27,0x09,0x06,0x26,0x05,0x98,0x80,0x02,0x00,0x12,0x00,0x00,0x30,0x05,0x71,0x0e,0x34,0x00,0x51,0x27,0x09,0x77,0x8c,0xde,0x71,0x90,0x00,0x3f,0x66,0x81,0xa9,0x9e,0x5a,0xd1,0x89,0x5e,0x9f,0xba,0x33,0xe6,0x21,0x2d,0x44,0x54,0xe1,0x68,0xbc,0xec,0x71,0x12,0x10,0x1b,0xf0,0x00,0x95,0x6e,0xd8,0xe9,0x2e,0x42,0x89,0x2c,0xb6,0xf2,0xec,0x41,0x08,0x81,0xa8,0x4a,0xb1,0x9d,0xa5,0x0e,0x12,0x87,0xba,0x3d,0x92,0x6c,0x3a,0x1f,0x75,0x5c,0xcc,0xf2,0x99,0xa1,0x20,0x70,0x55,0x00,0x02,0x04,0x67,0xc3,0x67,0x42,0x27,0x09,0x06,0x26,0x05,0x98,0x80,0x04,0x00,0x00,0xc3,0x02,0x54,0xf2,0xbc,0xa1,0xf7,0x00,0x19,0x27,0x09,0x62,0xf8,0x65,0xae,0x71,0x00,0xe2,0x07,0x6c,0x57,0xde,0x87,0x0e,0x62,0x88,0xd7,0xd5,0xe7,0x40,0x44,0x08,0xb1,0x54,0x5e,0xfc,0xa3,0x7d,0x67,0xf7,0x7b,0x87,0xe9,0xe5,0x41,0x68,0xc2,0x5d,0x3e,0xf1,0xa9,0xab,0xf2,0x90,0x5e,0xa5,0xe7,0x85,0xc0,0x1d,0xff,0x23,0x88,0x7a,0xd4,0x23,0x2d,0x95,0xc7,0xa8,0xfd,0x2c,0x27,0x11,0x1a,0x72,0xbd,0x15,0x93,0x22,0xdc,0x00,0x02,0x04,0x32,0x07,0xfc,0x8a,0x27,0x09,0x06,0x20,0x01,0x49,0xf0,0xd0,0xdb,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x27,0x09,0xca,0xfe,0x04,0xeb,0xa9,0x00,0x6c,0x6a,0x9d,0x1d,0xea,0x55,0xc1,0x61,0x6b,0xfe,0x2a,0x2b,0x8f,0x0f,0xf9,0xa8,0xca,0xca,0xf7,0x03,0x74,0xfb,0x1f,0x39,0xe3,0xbe,0xf8,0x1c,0xbf,0xeb,0xef,0x17,0xb7,0x22,0x82,0x68,0xa0,0xa2,0xa2,0x9d,0x34,0x88,0xc7,0x52,0x56,0x5c,0x6c,0x96,0x5c,0xbd,0x65,0x06,0xec,0x24,0x39,0x7c,0xc8,0xa5,0xd9,0xd1,0x52,0x85,0xa8,0x7f,0x00,0x02,0x04,0x54,0x11,0x35,0x9b,0x27,0x09,0x06,0x2a,0x02,0x6e,0xa0,0xd4,0x05,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x99,0x93,0x27,0x09};

using namespace ZeroTier;

int main()
{
	World world;
	world.deserialize(Buffer<ZT_DEFAULT_WORLD_LENGTH>(ZT_DEFAULT_WORLD, ZT_DEFAULT_WORLD_LENGTH), 0);

	for (const auto& root : world.roots()) {
		char buf[ZT_IDENTITY_STRING_BUFFER_LENGTH];
		std::cout << root.identity.toString(false, buf) << "\n";
		for (const auto& sp : root.stableEndpoints) {
			char buf2[ZT_IDENTITY_STRING_BUFFER_LENGTH];
			std::cout << sp.toString(buf2) << "\n";
		}
		std::cout << "\n";
	}
}
```

以上代码发布在[ZeroTierOne/attic/world/read_planet.cpp at dev · cxzlw/ZeroTierOne · GitHub](https://github.com/cxzlw/ZeroTierOne/blob/dev/attic/world/read_planet.cpp)。

运行结果如下：

```
cafe9efeb9:0:ccdef76bc7b97ded904eabc5df09886d9c1514a610036cb9139cc214001a2958978efcec15712dd3948c6e6b3a8e893df01ff493d1f8d9806a860c5420571bf0
104.194.8.134/9993
2605:9880:200:1200:30:571:e34:51/9993

778cde7190:0:3f6681a99e5ad1895e9fba33e6212d4454e168bcec7112101bf000956ed8e92e42892cb6f2ec410881a84ab19da50e1287ba3d926c3a1f755cccf299a1207055
103.195.103.66/9993
2605:9880:400:c3:254:f2bc:a1f7:19/9993

62f865ae71:0:e2076c57de870e6288d7d5e7404408b1545efca37d67f77b87e9e54168c25d3ef1a9abf2905ea5e785c01dff23887ad4232d95c7a8fd2c27111a72bd159322dc
50.7.252.138/9993
2001:49f0:d0db:2::2/9993

cafe04eba9:0:6c6a9d1dea55c1616bfe2a2b8f0ff9a8cacaf70374fb1f39e3bef81cbfebef17b7228268a0a2a29d3488c752565c6c965cbd6506ec24397cc8a5d9d15285a87f
84.17.53.155/9993
2a02:6ea0:d405::9993/9993
```

## 三、按照上述结果修改 moon.json

大概修改成这样

```json
{
    "id": "cafe9efeb9",
    "objtype": "world",
    "roots": [
        {
            "identity": "cafe9efeb9:0:ccdef76bc7b97ded904eabc5df09886d9c1514a610036cb9139cc214001a2958978efcec15712dd3948c6e6b3a8e893df01ff493d1f8d9806a860c5420571bf0",
            "stableEndpoints": [
                "104.194.8.134/9993",
                "2605:9880:200:1200:30:571:e34:51/9993"
            ]
        },
        {
            "identity": "778cde7190:0:3f6681a99e5ad1895e9fba33e6212d4454e168bcec7112101bf000956ed8e92e42892cb6f2ec410881a84ab19da50e1287ba3d926c3a1f755cccf299a1207055",
            "stableEndpoints": [
                "103.195.103.66/9993",
                "2605:9880:400:c3:254:f2bc:a1f7:19/9993"
            ]
        },
        {
            "identity": "62f865ae71:0:e2076c57de870e6288d7d5e7404408b1545efca37d67f77b87e9e54168c25d3ef1a9abf2905ea5e785c01dff23887ad4232d95c7a8fd2c27111a72bd159322dc",
            "stableEndpoints": ["50.7.252.138/9993", "2001:49f0:d0db:2::2/9993"]
        },
        {
            "identity": "cafe04eba9:0:6c6a9d1dea55c1616bfe2a2b8f0ff9a8cacaf70374fb1f39e3bef81cbfebef17b7228268a0a2a29d3488c752565c6c965cbd6506ec24397cc8a5d9d15285a87f",
            "stableEndpoints": [
                "84.17.53.155/9993",
                "2a02:6ea0:d405::9993/9993"
            ]
        }
    ],
    "signingKey": "xxx",
    "signingKey_SECRET": "xxx",
    "updatesMustBeSignedBy": "xxx",
    "worldType": "moon"
}
```

## 四、生成 .moon 文件

```bash
zerotier-idtool genmoon moon.json
```

## 五、使用 .moon 文件

在 Zerotier 目录[^3]下新建文件夹 moons.d。

把生成的 xxxxxxxxxxxxxxxx.moon 放到你的 moons.d文件夹。

重启 Zerotier 服务（不会重启的建议重启电脑）。

这样就好了，你可以开始享用你的自定义 Planet 带来的低延迟体验和官方 Planet 上大量的节点了。

## 结语

在这篇文章中，我们通过将 Zerotier 自带的 Planet 转为 Moon 来进行连接，以帮助使用自定义 Planet 的节点与官方 Planet 上的节点进行通信。这方便了我们在使用低延迟的自建 Planet 的同时与大量标准节点进行通信。

## 注

[^1]: 不作评价

[^2]: [Introduction | ZeroTier Documentation](https://docs.zerotier.com/self-hosting/introduction#:~:text=If%20you%20are%20using%20a%20custom%20root%20setup%2C%20your%20nodes%20won%27t%20be%20able%20to%20find%20standard%20nodes.)如果你使用自定义根配置，你的节点将无法找到其他标准节点。

[^3]: Linux 是 `/var/lib/zerotier-one`，Windows 是 `C:\ProgramData\ZeroTier\One\`。

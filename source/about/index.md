---
title: 关于我
# date: 2024-09-11 01:01:41
---

看来你想要了解一点关于我的信息\~

网名：cxzlw[^1]

年龄：<span id="age" style="display: none;">永远的 17 岁哟\~</span>

性别：女

生日：2008 / 04 / 04

邮箱：

- [cxz.lwnb@gmail.com](mailto:cxz.lwnb@gmail.com)
- [wsc_zds@qq.com](mailto:wsc_zds@qq.com)
- [cxzlw@cock.li](mailto:cxzlw@cock.li)

如果你想知道的话，没错咱是女高呢，嘻嘻\~

## 我的性别

女，我是 MtF 哦\~ 目前正在无证含糖，HRT 是从 2024 / 06 / 12 开始的，第一次 HRT 是用的自制凝胶哦。称呼方面，如果叫我姐姐 / 妹妹会超级超级超级开心的呢\~

GD 这块没有那么明显，所以明确自己是 trans 以及开始 HRT 之前其实纠结了大概半年。但是现在已经很确定了呢。

目前和关系超好的朋友们出柜了，但是和周围的同学们还没有都出柜。

## 我的年龄

如果你查看这个页面的 HTML 源码，就会发现年龄是动态计算的了哦。

当然，其实还有一个小彩蛋，这个就到时候再说叭\~

## 兴趣爱好

最大的兴趣爱好当然是编程啦！自建各种服务和学习网络安全相关的东西也是我爱干的事情呢。当然，对数学也比较感兴趣。

我的兴趣爱好似乎种类不多，但是会超级喜欢和朋友们待在一起，或许可以拉咱尝试一些从来没试过的爱好呢\~

~~悄悄告诉你，咱还很喜欢喵喵叫的喵\~~~

## 编程语言与技术栈

我主要擅长 Python，学习过 C++，Java，Kotlin，JS & TS。但是我 C++ 主要学的 OI 这块，所以开发项目可能没那么擅长。

由于之前主要喜欢用 Python 写后端，这就导致了我对前端的了解不是很多 ~~超级偏科~~，目前在学习 Vue。Web 开发这块会更喜欢前后端分离的方案。

- 前端：Vue, TypeScript
- 后端: FastAPI, Flask, Quart, Sanic
- ORM：SQLAlchemy, PonyORM
- 数据库：MariaDB / MySQL, SQLite（数据库这块并没有这么熟练，主要还是 ORM 为主 qwq）

我现在是用什么学什么的，所以哪怕是我不会的领域，也可以来拉着我一起搞呢\~

## 这个博客

建立这个博客的初衷是想要通过在 **可以被公开索引的网站** 写文章的方式，为简中互联网贡献一份自己的力量。同时，也想要一个更自由的平台来发自己的文章。于是这个博客就诞生了。

在建立这个博客以后，意识到自己的风格，并不是 _提供某个问题的解决方案但是不解释原因_，而是写比较长的文章一点点分析问题。所以这个博客的文章可能比较长，而且更新频率也不高，但是我会尽量让它更加的有趣。

[^1]: 其实有点想换掉这个网名，但是目前没有想到更合适的呢

<script>
    const age_ele = document.getElementById("age"); 
    const birthday = new Date("2008-04-04");
    const now = new Date();
    const age = Math.floor((now - birthday) / 1000 / 3600 / 24 / 365); 
    if (age <= 17) age_ele.innerText = "目前是 " + age + " 岁";
    age_ele.style.display = "inline";
</script>

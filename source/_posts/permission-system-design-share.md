---
title: 分享一个 Python 权限系统库的设计
date: 2023-08-04 15:32:59
license: BY-SA
excerpt: 最近在参与某 OJ 的开发，过程中我们需要一个权限系统。作为一个热爱 MC 的开发者，我很喜欢 luckperms 的设计，于是这个小东西就出来了。在这里给大家分享我们的权限系统设计。
tags:
    - 权限系统
    - Python
    - cxzlw
---

最近在参与某 OJ 的开发，过程中我们需要一个权限系统。作为一个热爱 MC 的开发者，我很喜欢 luckperms 的设计，于是这个小东西就出来了。在这里给大家分享我们的权限系统设计。

## 为什么不使用现成的库？

1. 如上文所说，我很喜欢 luckperms 的 `Group`，`Node`，`Route`
2. 我们希望整个项目使用 PonyORM
3. 我们希望这个库最好不要与某个 Web Framework 强关联，例如现在我们在用的 `Flask`，以便我们应对可能的切换框架的情况

## 术语

### 权限组

权限组储存了以下信息

- 权限组的名字
- 权限组的权重，这个权重只影响直属节点
- 权限组的成员，也就是用户
- 权限组继承的其他权限组
- 权限组直属的权限节点

权限组的成员不一定要在创建时指定，可以为用户指定某个权限组，效果是一样的。

权限组可以继承自其他权限组。相同的权限，会取权重较高的权限节点的值。也就是说，会覆盖低权重的节点

一般情况下，继承自某个权限组的新权限组，权重应当更高，这样才能覆盖某些权限。同时，检查权限时，如果遇到相同权重却互相矛盾的权限节点，无法保证其结果。

### 权限节点

权限节点储存了以下信息

- 一个权限 id，代表一个权限
- 一个 `bool` 值，代表是否拥有上述权限

权限节点本身没有权重，其权重来源是直属的权限组。

值得一提的是，一般情况下你不需要明确为没有某种权限的权限组，添加值为 `False` 的权限节点。检查权限时，没有值为 `True` 的对应节点，相当于没有这个权限。

我们一般使用值为 `False` 的权限节点来覆盖父权限组下的某些权限。

### 权限 id

权限是一个概念，在这里我们以权限 id 的形式来代表某种权限。

这个 id 是一个字符串，其没有具体的命名规则。具体由使用者制定。但我们建议你使用形如 `user.login`，`problem.edit`，`problem.1001.edit` 的格式命名。

## 使用方式

### 检查权限

```python
from permission import check_permission

user: User = ...  # 自行实现获得 User 对象的代码
print(check_permission(user))

```

### 权限节点

```python
user: PermissionGroup = ...  # 自行实现获得 PermissionGroup 对象的代码

# PermissionNode 没有 instance 方法
# 因此你需要自己避免在一个 PermissionGroup 下出现重复的 PermissionNode
# owner 是一个 PermissionGroup 对象，代表该节点属于这个权限组
# permission 是一个权限 id 字符串，检查权限时使用权限 id 而不是权限节点
# 代表同一个 permission 的 权限节点可能有多个，他们属于不同的权限组
this_node = PermissionNode(permission="user.login", value=True, owner=user)

this_node.value = False  # 修改该权限节点的值，True 代表有这个权限，False代表没有

```

### 权限组

```python
# instance 方法可以保证 name 相同时，每次运行都是同一个 PermissionGroup
# 方便你维护一个存储了你所有权限结构的文件
# 比如我们现在修改的是用户组
this_group = PermissionGroup.instance(name="User", weight=1)

parents = this_group.parents  # 该权限组继承的权限组们
parents.add(another_group)  # 使该权限组继承 another_group
parents.remove(another_group)  # 使该权限组不再继承 another_group

this_group.weight = 1  # 修改该权限组的权重

this_group.members.add(user)  # 向该权限组添加用户
this_group.members.remove(user)  # 从该权限组移除用户

this_group.nodes.add(permission_node)  # 向该权限组添加权限节点
this_group.nodes.remove(permission_node)  # 从该权限组移除权限节点

```

### 针对单个用户修改权限

思路是给用户分配一个单独的高权限 Group，再给这个 Group 分配 Node

## 代码分享

### models/db.py

```python
from pony.orm import Database

db = Database()

```

### models/user.py

```python
from pony.orm import Required, Set, Optional

from .db import db


class User(db.Entity):
    # You should add fields you need here.
    permission_groups = Set("PermissionGroup")

```

### models/permission_group.py

```python
from pony.orm import Required, Set, db_session

from .db import db


class PermissionGroup(db.Entity):
    name = Required(str, unique=True)
    weight = Required(int)
    nodes = Set("PermissionNode")
    members = Set("User")
    parents = Set("PermissionGroup", reverse="childs")
    childs = Set("PermissionGroup", reverse="parents")

    @classmethod
    @db_session
    def instance(cls, name, weight=None):
        """
        Return an PermissionGroup instance.

        If a PermissionGroup with the name exists, it will directly return the group,
            with new weight value. It is noticeable that, if weight is not given, it won't be changed.

        Or, it will create a new PermissionGroup with the given name and weight value.
            Notice that if the weight is not given here, an ValueError will be thrown.

        """
        result = cls.get(name=name)
        if result is None:
            if weight is None:
                raise ValueError
            return cls(name=name, weight=weight)
        if weight is not None:
            result.weight = weight
        return result

```

### models/permission_node.py

```python
from pony.orm import Required, db_session

from .db import db
from .permission_group import PermissionGroup


class PermissionNode(db.Entity):
    permission = Required(str)
    value = Required(bool)
    owner = Required(PermissionGroup)

```

### permission/\_\_init\_\_.py

```python
from queue import Queue

from models import User
from pony.orm import select


def check_permission(user: User, permission):
    queue = Queue()
    weight = float("-inf")
    value = False
    for group in user.permission_groups:
        queue.put(group)
    while not queue.empty():
        group = queue.get()
        for g in group.parents:
            queue.put(g)
        if group.weight < weight:
            continue
        values = select(node.value for node in group.nodes if node.permission == permission)
        for v in values:
            value = v
            weight = group.weight
    return value

```

## 代码许可

如无特殊授权，以上代码均以 [GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html) 授权

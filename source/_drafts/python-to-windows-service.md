---
title: 将 Python 项目打包为 Windows service
date: 2023-08-08 20:15:13
tags: 
  - Windows service
  - Nuitka
  - Python
  - cxzlw
excerpt: 今天想把一个 Python 项目用 Nuitka 打包后设为开机自启。突然发现 Nuitka Commercial 可以把 Python 项目打包为 Windows service， 然而要钱。当然人家也给出了 win32service 这个东西，那自然要看看。
---

今天想把一个 Python 项目用 Nuitka 打包后设为开机自启。突然发现 Nuitka Commercial 可以把 Python 项目打包为 Windows service， 然而要钱。当然人家也给出了 `win32service` 这个东西，那自然要看看。


## 一、安装

安装主要是 `pywin32` 和 `nuitka`

```bash
pip install nuitka pywin32
```

### 原程序

```python
from app import app

if __name__ == '__main__':
    app.run("0.0.0.0", 8899)

```

## 二、改为 Windows service

参考 [An example Windows service implemented with pywin32 wrappers. #python #windows-service #pywin32  · GitHub](https://gist.github.com/drmalex07/10554232) 和 [Python Windows service pyinstaller executables error 1053 - Stack Overflow](https://stackoverflow.com/questions/25770873/python-windows-service-pyinstaller-executables-error-1053/25934756#25934756)，将上面的代码改成这样

```python

# Filename: windows_service_entry

import sys

import servicemanager
import win32serviceutil

from app import app
from win32serviceutil import ServiceFramework


class WinSvcEntry(ServiceFramework):
    _svc_name_ = "StandaloneLicenseServer"
    _svc_display_name_ = "Standalone License Server"
    _svc_description_ = "Standalone License Server by cxzlw"

    def __init__(self, args):
        super().__init__(args)
        self.running = False

    def SvcDoRun(self):
        app.run("0.0.0.0", 8899)

    def SvcStop(self):
        app.stop()


if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(WinSvcEntry)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(WinSvcEntry)

```

然后用 Nuitka 打包

```bash
nuitka windows_service_entry.py --follow-imports --standalone
```

跑起来，记得带管理员权限。然后不出所料地，炸了……

```log
ModuleNotFoundError: No module named 'win32timezone'
```

把 `win32timezone` 加到 Nuitka 的 `--include-module` 里面，再打包

```bash
nuitka windows_service_entry.py --follow-imports --standalone --include-module="win32timezone"
```

## 三、运行/安装

安装

```batch
windows_service_entry.exe install
```

更新

```batch
windows_service_entry.exe update
```

启动

```batch
windows_service_entry.exe start
```

停止

```batch
windows_service_entry.exe stop
```

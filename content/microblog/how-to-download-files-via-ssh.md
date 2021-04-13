---
title: How to download files via SSH
createdAt: 2021-04-13 09:40:04
updatedAt: 2021-04-13 10:40:04
tags:
  - bash
---

```bash
scp your_username@remotehost.edu:foobar.txt /local/dir
```

Replace the username, host, remote filename, and local directory as appropriate.[^1]

Otras opciones: [^2]

```bash
# Copy something from another system to this system:
scp username@hostname:/path/to/remote/file /path/to/local/file
```

[^1]:	[https://stackoverflow.com/a/9427585/6456709][1]

[^2]:	[https://stackoverflow.com/a/9427762/6456709][2]

[1]:	https://stackoverflow.com/a/9427585/6456709
[2]:	https://stackoverflow.com/a/9427762/6456709
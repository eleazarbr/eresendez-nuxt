---
title: Mac OS xcrun error invalid active developer path, missing xcrun
summary: Despues de instalar las ultimas actualizaciones en Mac OS, sucede el error Mac OS xcrun error invalid active developer path, missing xcrun…
tags:
- git
---

Casi siempre, despues de instalar las ultimas actualizaciones en Mac OS, sucede el siguiente error:

```bash
git pull
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools),
missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

Solución: [^1]

```bash
$ xcode-select --install
```


[^1]:	[https://ma.ttias.be/mac-os-xcrun-error-invalid-active-developer-path-missing-xcrun/][1]

[1]:	https://ma.ttias.be/mac-os-xcrun-error-invalid-active-developer-path-missing-xcrun/
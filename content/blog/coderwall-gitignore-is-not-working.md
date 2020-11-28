---
title: "Coderwall Tip: .gitignore is not working"
summary: "Que hacer cuando quieres ignorar un archivo (.gitignore) y este todavía se encuentra en tu lista de cambios."
date: 2020-02-06 15:48
image: 4.jpeg
tags: [Tip]
---

Algunas veces al querer ignorar un archivo o carpeta y este ya se encuentra en `.gitignore` y aún así no desaparece de la lista de cambios. Entonces, podemos hacer el siguiente tip.

> Even if you haven’t tracked the files so far, git seems to be able to “know” about them even after you add them to .gitignore.

> **NOTE** : First commit your current changes, or you will lose them. Then run the following commands from the top folder of your git repo:

```bash
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

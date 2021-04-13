---
title: Git Cherry Pick
createdAt: 2021-04-13 10:50:19
updatedAt: 2021-04-13 10:50:19
tags:
  - git
---

Workflow para hacer un Cherry Pick en Git.
<!--more-->

```Git
git checkout master...a-good-feature  [checkout the common ancestor]
git checkout -b patch
git cherry-pick a-good-feature  [this is not only the branch name, but also the commit we want]
git checkout master
git merge patch
git checkout a-good-feature
git merge -s ours patch
```

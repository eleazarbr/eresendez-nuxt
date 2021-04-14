---
title:
createdAt: 2021-04-08 10:11
tags:
- laravel
---

Una manera de obtener el mismo resultado con una sola linea de código. Laravel helper method tap().
<!--more-->

Interesante entrada en donde se explica el uso del helper `tap` en Laravel. [^1]

Recordar: siempre qué hacemos `$model->update()`, el resultado es un boolean. Si queremos obtener el recurso modificado en una sola linea de código:

```php
$user = tap($user)->update($request->all());
```


[^1]:	[https://dev.to/simo\_benhida/the-magic-laravel-helper-tap--1jc7][1]

[1]:	https://dev.to/simo_benhida/the-magic-laravel-helper-tap--1jc7
---
title: "Usando Custom Eloquent Casts en Laravel 7"
summary: "Atymic explica una nueva característica de Laravel 7: Los Eloquent Casts personalizados."
date: 2020-03-08 18:36:00
image: 10.png
external\_url:
  url: https://atymic.dev/blog/laravel-custom-casts/
  site: https://atymic.dev
tags: [Laravel]
---

En Atymic explican una nueva característica de Laravel 7: **los Eloquent Casts personalizados. **

Cualquier objeto que implemente el nuevo contract `CastsAttributes` proporcionado por Laravel podrá ser usado en la propiedad `$casts` de un modelo. 

Al acceder a las propiedades de su modelo, Eloquent primero comprobará si hay un _cast personalizado_ para transformar el valor y devolverlo.

Más información:

[Laravel Custom Casts][1]

[1]:	https://laravel.com/docs/7.x/eloquent-mutators#custom-casts "Laravel Custom Casts"
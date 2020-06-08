---
title: Bulma Navbar con Alpine.js
summary:  Un Hola, Mundo! Con Alpine.js. “A rugged, minimal framework for composing JavaScript behavior in your markup”.
date: 2020-06-06 10:00:00
image:
external_url:
  url: https://github.com/alpinejs/alpine
  site: https://github.com
tags: [Alpine.js, Bulma]
---

Alpine.js ofrece una naturaleza reactiva y declarativa propia de grandes frameworks como Vue a un costo mucho menor.

En este ejemplo de Hola Mundo con Alpine.js vamos a hacer un simple _toggle_ de clases para hacer funcionar el botón _burger_ del `navbar` de Bulma.

<p class="codepen" data-height="465" data-theme-id="dark" data-default-tab="html,result" data-user="eleazarbr" data-slug-hash="QWybRxB" style="height: 465px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Bulma Navbar with Alpine.js">
  <span>See the Pen <a href="https://codepen.io/eleazarbr/pen/QWybRxB">
  Bulma Navbar with Alpine.js</a> by Eleazar Resendez (<a href="https://codepen.io/eleazarbr">@eleazarbr</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Me pareció un proyecto interesante y es practico poder hacer este tipo de funcionalidad  **básica** desde el DOM. 

Bulma es solo un framework CSS, nada de JavaScript. Lo clásico es crear un `event listener` en el botón y cuando un usuario haga click en el, disparar un evento que le diga al navegador que hacer.

Puedes ver los ejemplos de implementación con Vanilla JavaScript y jQuery en [https://bulma.io/documentation/components/navbar/][1] y comparar esas soluciones con Alpine.js.

Este pequeño framework nos permite escribir código declarativo, mas limpio y fácil de leer. Es una solución rápida y sencilla para:

- Mostrar y ocultar nodos del DOM bajo ciertas condiciones
- Hacer `binding` en formularios
- Escuchar eventos y alterar la UI en consecuencia
- Añadir clases

Más información:

-  Introducing Alpine.js: A Tiny JavaScript Framework: [https://www.smashingmagazine.com/2020/03/introduction-alpinejs-javascript-framework/][2]

[1]:	https://bulma.io/documentation/components/navbar/
[2]:	https://www.smashingmagazine.com/2020/03/introduction-alpinejs-javascript-framework/

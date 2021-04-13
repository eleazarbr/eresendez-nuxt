---
title: Personalización del Scrollbar
tags:
- css
---

Sobre la personalización de los Scrollbars con CSS: 
<!--more-->

- Los motores de navegadores basados en **WebKit** incorporaron cosas como `::-webkit-scrollbar`. Lo anterior funciona para Safari, Chrome, etc. [^1]
- Los estándares finalmente se han involucrado y esas opciones de estilo están cubiertas por propiedades _sin prefijo_ como: `scrollbar-color` y `scrollbar-width`. [^2]

Actualmente, las barras de desplazamiento **pueden personalizarse en Chrome, Edge y Safari** mediante el prefijo pseudo-element `-webkit-scrollbar`: [^3]

```css
body::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: orange;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: blue;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid orange;  /* creates padding around scroll thumb */
}
```

El siguiente [artículo][4] presenta algunas librerías, en caso de querer utilizar un scrollbar independiente, con algunas opciones extra para personalizarlo:
- [perfect-scrollbar][5]
- [simplebar][6]

Otras librerías y un codepen interesante:
- [vue-scrollbar][7]
- [https://codepen.io/MathieuRichard/pen/HAgnm][8]

[^1]:	[https://css-tricks.com/almanac/properties/s/scrollbar/#browser-support][1]

[^2]:	[https://css-tricks.com/almanac/properties/s/scrollbar/][2]

[^3]:	[https://www.digitalocean.com/community/tutorials/css-scrollbars][3]

[1]:	https://css-tricks.com/almanac/properties/s/scrollbar/#browser-support
[2]:	https://css-tricks.com/almanac/properties/s/scrollbar/
[3]:	https://www.digitalocean.com/community/tutorials/css-scrollbars
[4]:	https://beraliv.medium.com/scrollbar-customisation-31bd28652e9
[5]:	https://github.com/mdbootstrap/perfect-scrollbar
[6]:	https://github.com/Grsmto/simplebar
[7]:	https://github.com/BosNaufal/vue-scrollbar
[8]:	https://codepen.io/MathieuRichard/pen/HAgnm

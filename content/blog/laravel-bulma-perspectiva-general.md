---
title: "Laravel 6.0 & Bulma.io v0.7.5 (overview)"
summary: "Bulma es un framework CSS opensource, basado en Flexbox. 100% responsivo, modular y provee un sistema simple de grid."
date: 2020-02-15 08:30:00
image: 5.jpeg
tags: [Bulma, Laravel]
---

Bulma es un framework CSS opensource, interesante, divertido basado en Flexbox, es 100% responsive, modular y provee un sistema simple de columnas.

Es una colección de clases CSS, consiste en 39 archivos `.sass` los cuales pueden ser importados individualmente.

## Requerimientos previos

1. Usar el doctype HTML5:  

```html
<!DOCTYPE html>
```

2. Agregar el meta tag responsive viewport:  

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## ¿Cómo instalar Bulma en Laravel 6.0?

Bulma se puede instalar de diferentes maneras:

- Vía CDN: (https://cdnjs.com/libraries/bulma).
- Descarga del repositorio en GitHub: (https://github.com/jgthms/bulma/tree/master/css).
- Vía npm.
- Más información en: https://bulma.io/documentation/overview/start/

En mi caso, lo voy a instalar con Laravel Mix y `npm`:

```bash
npm install bulma
```

Lo incluyo en el archivo `app.scss`

```scss
@import "~bulma/bulma.sass";
```

Compilar:

```bash
npm run dev
```

Listo, sí agregas el siguiente código HTML en cualquier vista, podrás ver que la instalación ha sido correcta, verás una lista de progress bar de diversos colores.

```html
<progress class="progress is-primary" value="30" max="100">30%</progress>
<progress class="progress is-info" value="45" max="100">45%</progress>
<progress class="progress is-success" value="60" max="100">60%</progress>
<progress class="progress is-warning" value="75" max="100">75%</progress>
<progress class="progress is-danger" value="90" max="100">90%</progress>
```

## Responsividad

Cada elemento de Bulma es mobile-first y es optimizado para lectura vertical.

- El sistema de columnas es una de las partes mas interesantes del framework, se apilan horizontalmente gracias a las propiedades flex. Mas información de columnas.
- El `navbar` menú, tiene muchas opciones, por ejemplo en dispositivos móviles se adapta para esconderse tras un `navbar-burger`.
- Cabe señalar que este framework es exclusivamente CSS, no incluye ningún tipo de código javascript, por lo que la funcionalidad del navbar-burger va por tu cuenta.
- [Más información del navbar][1].

> Se puede forzar un layout horizontal si añadimos la clase modificadora is-mobile en algunos elementos y componentes del framework.

Bulma tiene 5 breakpoints:

- `mobile`: arriba de `768px`
- `tablet`: de `769px`
- `desktop`: de `1024px`
- `widescreen`: de `1216px`
- `fullhd`: de `1408px`

Bulma usa 9 responsive mixins:

- `=mobile` hasta `768px`
- `=tablet` de `769px`
- `=tablet-only` de `769px` y hasta `1023px`
- `=touch` hasta `1023px`
- `=desktop` de `1024px`
- `=desktop-only` de `1024px` y hasta `1215px`
- `=widescreen` de `1216px`
- `=widescreen-only` de `1216px` y hasta `1407px`
- `=fullhd` de `1408px`

## Modificadores

Bulma cuenta con clases de utilidad o modificadores, lo que permite obtener estilos alternativos para casi todos sus elementos. Estos modificadores se nombran de la siguiente manera: `is-*` o `has-*.` Por ejemplo:

Para dar estilo a un botón normal, simplemente agregamos la clase `button`.

```html
<button class="button">Hello world</button>
```

Ahora, es posible cambiar el estilo al botón anterior añadiendo las clases modificadoras:

```html
<button class="button is-large is-success is-rounded has-text-weight-bold">Hello world</button>
```

Lo anterior crea un botón "grande", de color verde por la clase: `is-success` la cual contiene un `background-color: #22c65b` y `color: #fff`,con borde redondo y texto en negritas.

## Columnas

Una de las características más importantes de cualquier framework CSS, es como resuelven el tema de las columnas. Bulma se basa en flexbox y de la siguiente manera se crea una fila con tres columnas:

```html
<div class="columns">
  <div class="column">
    Columna uno
  </div>
  <div class="column">
    Columna dos
  </div>
  <div class="column">
    Columna tres
  </div>
</div>
```

Una vez mas, utilizando los modificadores podemos controlar el tamaño del ancho de las columnas, algunos ejemplo:

- `is-three-quarters`
- `is-two-thirds`
- `is-half`
- `is-one-third`
- `is-one-quarter`
- `is-four-fifths`
- `is-three-fifths`
- `is-two-fifths`
- `is-one-fifth`

También, podemos asignar el `width` de la columna con las siguientes clases modificadoras:

`is-2`, `is-3`, ... , `is-12`

## Otros recursos y documentación

El resto de la biblioteca es intuitiva y sencilla, provee algunos "componentes" y te brinda muchos ejemplos. Este website usa Bulma.

Más información:

- Responsividad: https://bulma.io/documentation/overview/responsiveness/
- Mixins: https://bulma.io/documentation/overview/mixins/
- Componentes Lightweight para Vue.js basado en Bulma - https://buefy.github.io/

[1]:	https://bulma.io/documentation/components/navbar/
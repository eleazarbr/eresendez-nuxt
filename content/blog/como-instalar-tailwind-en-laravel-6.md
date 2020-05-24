---
title: "¿Cómo instalar Tailwind 1.1.2 en Laravel 6.0?"
summary: "La instalación de Tailwind 1.1.2 en Laravel 6.0 es muy sencilla y rápida. Te recomiendo empezar dar un vistazo a estas utility-classes"
date: 2020-02-17 15:30:00
image: 6.png
external_url:
  url: https://nerdcave.com/tailwind-cheat-sheet
  site: https://nerdcave.com
tags: [Laravel, Tailwind]
---

Para instalar la última versión de Tailwind CSS en Laravel 6.0 basta con seguir los siguientes pasos: [^1]

1. Instalar Tailwind via npm

```bash
npm install tailwindcss
```

2. Añadirlo a nuestro archivo `app.scss`

```scss
// Tailwind 1.1.2
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

3. Crear el archivo de configuración (opcional)

```bash
npx tailwind init
```

4. Procesar nuestro CSS con Tailwind (Laravel Mix en mi caso)  

```javascript
const tailwindcss = require('tailwindcss')

mix.sass('resources/sass/app.scss', 'public/css')
 .options({
   processCssUrls: false,
   postCss: [ tailwindcss('./path/to/your/tailwind.config.js') ],
 })
```

Ahora podemos hacer uso de todas las _utility-classes_ de Tailwind en su versión más reciente.

La siguiente página, es una Cheat Sheet que consulto muchas veces para conocer las clases que brinda Tailwind, espero te resulte útil.

[^1]:	https://tailwindcss.com/docs/installation/

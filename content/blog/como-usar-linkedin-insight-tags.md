---
title: Cómo usar LinkedIn Insight Tags en Laravel
summary: Para realizar un seguimiento cada vez que un usuario hace un conversión en el sitio web.
date: 2021-03-05 17:00:00
image: 9Zjd7PE_FRM
tags: [Laravel]
---

Esta etiqueta de LinkedIn es un fragmento JavaScript que coloca una cookie en los navegadores web de los visitantes. Esto permite realizar un seguimiento cada vez que un usuario hace una conversión en el sitio web.

La instalación debería tomar unos cuantos minutos. 

1. Vamos a crear un archivo blade que solo se muestre en producción.
2. Después, es necesario obtener, copiar y pegar el código desde el [Administrador de Campañas][1].

```php
// archivo partials/_linkedin-insight-tag.blade.php

@if (app()->environment(['production']))

@push('scripts')
// insertar código aquí
@endpush

@endif
```

El archivo anterior debe de estar preferiblemente justo antes de la etiqueta `</body>`.

```html
<!-- archivo layouts/app.blade.php -->

...

  @stack('scripts')
</body>
```

Ahora solo debes incluir la etiqueta donde lo necesites: 

```html
@include('partials._linkedin-insight-tag')
```

Una vez que LinkedIn reciba una señal de la etiqueta en su sitio web, tus dominios aparecerán en **Insight Tag**.

[1]:	https://www.linkedin.com/help/lms/answer/76257 "LinkedIn Campaign Manager"
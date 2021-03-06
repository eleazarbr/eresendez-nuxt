---
title: Cómo usar Google reCAPTCHA v3 en Laravel
summary: Pasos para añadir reCAPTCHA y verificar si el usuario es un bot o no.  
date: 2021-03-06 17:00:00
image: t8TOMKe6xZU
tags: [Laravel, Vue]
---

Google reCAPTCHA v3 es un mecanismo para verificar si el usuario es un bot o no.

También ayuda a conocer mejor el trafico en nuestro sitio web y permite elegir si queremos usar reCAPTCHA v2 para mostrar un desafío mas complicado al usuario, mientras que en otras areas más comunes como el inicio de sesión, búsquedas o comentarios podemos usar reCAPTCHA v3.

Para este ejemplo vamos a utilizar el siguiente paquete, hecho especialmente para Laravel y Vue:

- [Laravel Google reCAPTCHA v3 - Ver en GitHub][1]

## Requerimientos

- Laravel 7 o mayor.
- Conocimiento básico de Google reCAPTCHA v3.

## Instalación

Vía composer:

```bash
composer require timehunter/laravel-google-recaptcha-v3 "~2.4.0"
```

Después, ejecutar el siguiente comando para obtener el archivo de configuración:

```bash
php artisan vendor:publish --provider="TimeHunter\LaravelGoogleReCaptchaV3\Providers\GoogleReCaptchaV3ServiceProvider" --tag=googlerecaptchav3.config
```

Para el componente de Vue.

```bash
php artisan vendor:publish --provider="TimeHunter\LaravelGoogleReCaptchaV3\Providers\GoogleReCaptchaV3ServiceProvider" --tag=googlerecaptchav3.vuejs
```

Al terminar, deberás ver el archivo `googlerecaptchav3.php` en `app/config` y el componente de Vue en `js/components/googlerecaptchav3.vue`.

Este paquete también incluye traducciones para tu aplicación multi-lenguaje.

## Configuración

Ahora agregaremos las credenciales mas importantes en el archivo `.env`, las cuales puedes obtener fácilmente aquí: [https://www.google.com/recaptcha/about/][2].

```bash
RECAPTCHA_V3_SECRET_KEY=
RECAPTCHA_V3_SITE_KEY=
```

En este momento ya deberías tener configurado tu dominio en: [https://www.google.com/recaptcha/admin/][3]. La versión v3 del captcha trabaja con acciones y esas acciones deben especificarse en el archivo de configuración.

```php
'setting' =  [
    [
        'action' => 'contact_us', // Google reCAPTCHA required paramater
        'threshold' => 0.2, // score threshold
        'score_comparision' => false // if this is true, the system will do score comparsion against your threshold for the action
    ],
    [
        'action' => 'signup',
        'threshold' => 0.2,
        'score_comparision' => true
    ],
]
```

## Ejemplo de uso con Vue

Para este ejemplo, se agregará la acción `contact_us` para el formulario de contacto del [cotizador en línea][4].  Se estableció un valor de 0.5 y que se realice la comparación de score.

```php
// archivo config/googlerecaptchav3.php

[
    'action' => 'contact_us',
    'threshold' => 0.5,
    'score_comparision' => true,
],
```

Supongamos que tenemos un componente `ContactForm.vue`, entonces:

1. Vamos a importar el componente del paquete: `GoogleReCaptchaV3`.
2. Lo siguiente es pasar el valor del `RECAPTCHA_V3_SITE_KEY` como una prop a `GoogleReCaptchaV3.vue`:

Para ello, agregué el siguiente valor en el archivo `.env`:

```bash
MIX_RECAPTCHA_V3_SITE_KEY="${RECAPTCHA_V3_SITE_KEY}"
```
> Recuerda volver a ejecutar el comando para compilar tus componentes de Vue

Y cambiar la banderita Boolean `required` de false a true en el archivo `GoogleReCaptchaV3.vue`  la propiedad `siteKey: { required: true, }`.

```js
// archivo ContactForm.vue
<template>
<div>
  ...
  <google-recaptcha
    :site-key="siteKey"
    v-model="form.g_recaptcha_response"
    ref="captcha"
    id="contact_us_id"
    inline
    action="contact_us"
  ></google-recaptcha>
</div>
</template>

<script>
import GoogleRecaptcha from "@/components/googlerecaptchav3/GoogleReCaptchaV3";
    // location might be diff to your case, ensure that your component location is right

export default {
  name: "ContactForm",
  components: {
    GoogleRecaptcha
  },

  data: () => ({
    siteKey: "",
  }),

  mounted() {
    this.siteKey = process.env.MIX_RECAPTCHA_V3_SITE_KEY;
  },

});
</script>
```

Esto sería toda la implementación con Vue. Por ultimo, el autor del paquete recomienda que actualicemos el token en cada submit:

```js
// archivo ContactForm.vue

...

methods: {
  submit() {
    axios
      .post(route("welcome.contact"), this.form)
      .then((r) => {
        this.$refs.captcha.execute(); // every time you submit, the reCAPTCHA token needs to be refreshed
      })
      .catch((e) => {
        this.$refs.captcha.execute(); // every time you submit, the reCAPTCHA token needs to be refreshed
      });
  },
}
```

## Validación del token en Laravel

Puedes usar el objeto de Validación proporcionado por el paquete para verificar el reCAPTCHA.

```php
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;

public function sendMessage(Request $request)
{
  $request->validate([
      'g_recaptcha_response' => [new GoogleReCaptchaV3ValidationRule('action_name')]
  ]);

  // do stuff
}
```

Solo modifica el string anterior `action_name` por el nombre de tu acción, si es NULL, el paquete no verificará la acción con la respuesta de google. En mi caso `action_name` es `contact_us`.

## Posible error de Timeout

Para más información da un vistazo a este comentario en GitHub:
[https://github.com/RyanDaDeng/laravel-google-recaptcha-v3/issues/59#issuecomment-574137069][5].

## Enlaces de interés

- Google reCAPTCHA FAQs: [https://developers.google.com/recaptcha/docs/faq][6].

[1]:	https://github.com/RyanDaDeng/laravel-google-recaptcha-v3 "Paquete en GitHub: Laravel Google reCAPTCHA v3"
[2]:	https://www.google.com/recaptcha/about/ "reCAPTCHA About Page"
[3]:	https://www.google.com/recaptcha/admin/ "reCAPTCHA Admin Dashboard"
[4]:	https://isabyte.com/cotizador "Cotizador en Línea de Isabyte"
[5]:	https://github.com/RyanDaDeng/laravel-google-recaptcha-v3/issues/59#issuecomment-574137069 "GitHub Issue sobre reCAPTCHA Timeout Error"
[6]:	https://developers.google.com/recaptcha/docs/faq "reCAPTCHA FAQs"
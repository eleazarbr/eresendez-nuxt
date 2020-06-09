---
title: Acerca de ConvertKit
summary: ConvertKit es una solución de marketing por correo electrónico para aquellos que estén interesados en aumentar las conversiones y optimizar su embudo de ventas.
date: 2020-06-03 17:14:00
image:
tags: [Email Marketing]
---

Es mas que un tradicional sistema para administrar listas de audiencias y es que entre más rápido se construya una audiencia, mejor.

Los formularios de registro se utilizan de muchas maneras, por ejemplo para enviar un regalo, los suscriptores obtienen algo que necesitan y a cambio dejan su correo electrónico. También pueden usarse para registrarse a un boletín de noticias.

El lugar y la forma en la que aparecen depende del gusto de cada quien. Personalmente, prefiero un formulario de registro _inline_ a una ventana emergente o _pop up_.

El primer paso sería crear una cuenta en [ConvertKit][1] e iniciar sesión.

## Email settings

Antes de crear un formulario de registro vamos a realizar una configuración previa.

Si deseas registrar otra cuenta de correo electrónico, dirígete a [https://app.convertkit.com/account/edit#email\_settings][2].

En esta misma página puedes editar la zona horaria y una dirección que es usada para cubrir las leyes anti-spam. 

También, si es necesario verifica tu nombre de dominio, ConvertKit da la opción de verificar el dominio mediante los DNS records. Si usas CloudFlare esto te puede servir: [https://community.cloudflare.com/t/trying-to-update-dns-cname-for-convertkit/105669/3][3].

##  ¿Cómo crear un formulario de registro?

Después, dirigirse a [https://app.convertkit.com/forms][4] y hacer click en el botón `New`. Elegir la forma en la que se va a desplegar el formulario. 

![][image-1]

Eliges una plantilla:

![][image-2]

Y casi listo. El formulario tiene los “\_placeholders\_” en ingles, podemos editar las palabras de `Your name` a `Tu nombre`, cambiar el color del fondo y texto del botón.

Por ultimo, obtenemos el código para usarlo en nuestro website.

```js
<script async data-uid="0477aed199" src="https://witty-originator-595.ck.page/0477aed199/index.js"></script>
```

Y generar el formulario:

<script async data-uid="0477aed199" src="https://witty-originator-595.ck.page/0477aed199/index.js"></script>

##  Conclusión

Fue un ejemplo de integración sencillo usando las herramientas que proporciona ConvertKit. 

Después, si es necesario haré uso de su API para crear mi propio formulario y hacerlo multi-lenguaje.

Todavía haré más pruebas e iré actualizando esta entrada con mas información.

## Todo

- Configurar los Incentive Emails
- Crear una landing page

[1]:	https://app.convertkit.com/users/signup
[2]:	https://app.convertkit.com/account/edit#email_settings
[3]:	https://community.cloudflare.com/t/trying-to-update-dns-cname-for-convertkit/105669/3
[4]:	https://app.convertkit.com/forms

[image-1]:	/blog/post/10-1.png
[image-2]:	/blog/post/10-2.png

---
title: "¿Cómo recibir notificaciones en Slack desde Laravel? "
summary: "Vamos a seguir un proceso rápido que permitirá publicar mensajes en Slack usando Incoming Webhooks y Laravel en unos minutos."
date: 2020-02-28 17:08:00
image: 9.jpeg
tags: [Laravel, Slack]
---

Un poco de teoría:

> Los webhooks son una forma sencilla de publicar mensajes de fuentes externas en Slack. Utilizan solicitudes HTTP normales con una carga útil JSON, que incluye el mensaje y algunos otros detalles opcionales. Puedes incluir archivos adjuntos para mostrar mensajes con formato enriquecido.

Vamos a seguir un proceso rápido de 4 pasos, que permitirá publicar mensajes usando Webhooks en unos minutos.

## Configurar "Incoming Webhooks"

### 1. Crear una Slack App

Ingresa en el siguiente enlace: [https://api.slack.com/apps?new\_app=1][1] y elige:

- un nombre
- un espacio de trabajo para asociar la aplicación (teniendo en cuenta que probablemente se publicarán algunos mensajes de prueba, por lo que es posible que desee crear un canal especial para pruebas)

Después, haz clic en _Crear Aplicación_, si es que no has creado una aplicación anteriormente.

### 2. Activar los Incoming Webhooks

Con la nueva aplicación creada, serás re-dirigido a la página de configuración de su nueva aplicación (si está utilizando una aplicación existente, simplemente cargue su configuración a través del administrador de apps.

En esa página, selecciona la función _Incoming Webhooks_ y haz clic en el switch _”Activar Incoming Webhooks”_.

### 3. Crear un Incoming Webhook

Una vez que los Incoming Webhooks están habilitados, la página de configuración debería actualizarse y aparecerán algunas opciones adicionales.  Una de esas opciones será un botón llamado _”Agregar nuevo webhook”_ al espacio de trabajo. Haz click en el.

Lo que hace este botón es activar una versión corta del proceso de instalación de aplicaciones de Slack, una que es completamente autónoma para que no tengas qué escribir ningún código para generar una Webhook URL. Por ahora verá algo como la siguiente pantalla:

![Screenshoot image][image-1]

Continúe y elija un canal en el que la aplicación publicará los mensajes y luego haga click para Autorizar su aplicación.

Volverá a la configuración de su aplicación y ahora debería ver una nueva entrada en la sección URL de Webhook para su área de trabajo, con una URL de Webhook que se verá así:

```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

Esa URL es su nuevo Incoming Webhook, uno que es específico para un solo usuario y un solo canal.

> Mantenlo en secreto y a salvo, la URL del webhook es secreta. No lo comparta en línea, incluso a través de repositorios públicos de control de versiones.

### 4. Use su Incoming Webhook URL para publicar un mensaje

Ahora, simplemente haga una solicitud HTTP POST como:

```json
POST https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
Content-type: application/json
{
   "text": "Hello, world."
}
```

El _endpoint_ al que está haciendo la solicitud POST debe ser la misma URL que generó en el paso anterior.

¡Listo! Vaya y verifique el canal en el que se instaló su aplicación y verá que su aplicación ha publicado el mensaje "Hola, Mundo".

Vayamos a nuestra Laravel App.

## En Laravel

Es necesario instalar el siguiente paquete: `composer require laravel/slack-notification-channel`.

Después, para enrutar las notificaciones de Slack a la ubicación adecuada, debemos definir un método `routeNotificationForSlack` en la entidad que usa Notifiable. Esta función debería devolver la URL del webhook de los pasos anteriores, a la que se debe entregar la notificación.


```php
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
   use Notifiable;

   /**
    * Route notifications for the Slack channel.
    *
    * @param \Illuminate\Notifications\Notification $notification
    * @return string
    */
   public function routeNotificationForSlack($notification)
   {
       return 'https://hooks.slack.com/services/...';
   }
}
```

### Formatting Slack Notifications

Si una notificación o email admite el envío como un mensaje de Slack, debe definir un método `toSlack` en la clase de notificación. Este método recibirá una entidad `$notifiable` y debería devolver una instancia de `Illuminate\Notifications\Messages\SlackMessage`. Ejemplo:

```php
use Illuminate\Notifications\Messages\SlackMessage;

/**
 * Get the notification's delivery channels.
 *
 * @param mixed $notifiable
 * @return array
 */
public function via($notifiable)
{
   return [
       'mail',
       'slack'
   ];
}

/**
 * Get the Slack representation of the notification.
 *
 * @param mixed $notifiable
 * @return SlackMessage
 */
public function toSlack($notifiable)
{
   return (new SlackMessage)
     ->content('One of your invoices has been paid!');
}
```

## Más información

- Notifications: Slack. https://laravel.com/docs/5.8/notifications#slack-notifications
- Routing Slack Notifications. https://laravel.com/docs/5.8/notifications#routing-slack-notifications
- Slack Incoming Webhooks. https://api.slack.com/messaging/webhooks


[1]:	https://api.slack.com/apps?new%5C_app=1

[image-1]:	/blog/post/9-1.png
---
title: "¿Cómo usar los webhooks de Mailchimp?"
summary: "Los webhooks en Mailchimp se usan para recopilar información sobre los cambios en una lista o audiencia a medida que ocurren."
date: 2020-02-23 10:43:00
image: 8.png
tags: [Laravel, Mailchimp]
---

El concepto de WebHook es simple, es una devolución de llamada HTTP que se dispara en ciertas situaciones. Una notificación de eventos a través de HTTP POST. [^1]

## Webhooks en Mailchimp

Los webhooks en Mailchimp se usan para recopilar información sobre los cambios en una lista o audiencia a medida que ocurren. 

Es necesario ingresar una URL válida y luego seleccionar el tipo de actualizaciones que se desea recibir. El propósito es poder obtener actualizaciones al instante. [^2]

## Cómo crear un webhook en Mailchimp

Para crear un webhook, sigue estos pasos:

1. Inicia sesión en Mailchimp y luego dirígete a la página **Audiencia **.
2. Selecciona el menú desplegable junto a la audiencia con la que desea trabajar y luego elija ** Configuración **.
3. En la página Configuración, haga clic en ** Webhooks **.
4. Haga clic en ** Crear nuevo webhook **.
5. En el campo `Callback URL`, escriba la URL de la aplicación a la que desea enviar solicitudes webhook. Esta URL recibirá datos sobre la audiencia de Mailchimp. Por ejemplo: `https://www.my-domain.com/api/hooks/unsubscribe-callback`.
6. Seleccione que tipo de actualizaciones deseas recibir. Por ejemplo: `Subscribes`, `Unsubscribes`, `Profile updates`, etc. Para este ejemplo seleccionaré solo `Unsubscribes`.
7. Clic en Guardar.

El webhook notificará a su aplicación de cualquier evento. Pero antes, es necesario crear las siguientes rutas, tomando en cuenta que:

> Mailchimp envía HTTP POST para datos reales, el validador de webhook solo envía solicitudes HTTP GET. Deberá permitir ambas rutas para que su webhook funcione correctamente.

Entonces:

```php
Route::match(['get', 'post'], 'hooks/unsubscribe-callback', 'NewsletterController@unsubscribeCallback');
```

### Datos del webhook

Ahora, en cada momento que exista un evento de tipo `Unsubscribe` en la lista, Mailchimp enviará la siguiente información a la Callback URL establecida.

```json
"type": "unsubscribe",
"fired_at": "2009-03-26 21:40:57",
"data[action]": "unsub",
"data[reason]": "manual",
"data[id]": "8a25ff1d98",
"data[list_id]": "a6b5da1054",
"data[email]": "api+unsub@mailchimp.com",
"data[email_type]": "html",
"data[merges][EMAIL]": "api+unsub@mailchimp.com",
"data[merges][FNAME]": "Mailchimp",
"data[merges][LNAME]": "API",
"data[merges][INTERESTS]": "Group1,Group2",
"data[ip_opt]": "10.20.10.30",
"data[campaign_id]": "cb398d21d2",
"data[reason]": "hard"
```

Finalmente, podrás trabajar con esa respuesta en tu función `unsubscribeCallback()`.

```php
/**
 * Mailchimp unsubscribe callback
 */
public function unsubscribeCallback(Request $request): void
{
    //
}
```

[^1]:	https://webhooks.pbworks.com/w/page/13385124/FrontPage

[^2]:	https://mailchimp.com/developer/guides/about-webhooks/
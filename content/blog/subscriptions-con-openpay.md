---
title: Subscriptions con OpenPay
summary:  Cómo crear una suscripción para cobrar periódicamente un servicio a un cliente con Openpay. 
date: 2020-06-07 10:49:00
image:
tags: [Laravel, Openpay]
---

Enlace a la documentación de OpenPay: [https://www.openpay.mx/en/docs/suscriptions.html][1]

Supongamos que tiene un servicio donde ofrece una prueba de un mes y luego cobra una tarifa mensual de $99.99 pesos indefinidamente (o hasta que su cliente cancele el servicio).

Tienes que hacer lo siguiente:

1. Crear un plan
2. Crear cliente
3. Guardar tarjeta
4. Suscribir cliente

## Crear un plan

Un plan es una plantilla para una suscripción que contiene el costo, la frecuencia de carga, el período de prueba, etc. Un plan se puede crear mediante la API o desde el dashboard.

Los datos más importantes:

- `amount` **numeric**
	-  Monto que se aplicará cada vez que se cobre la suscripción. Debe ser una cantidad mayor a cero, con hasta 2 dígitos decimales.
- `currency` **string**
	-   Moneda usada en la operación, por default es MXN.
	- _En el dashboard de pruebas no se permite modificar la moneda. De igual manera, si se crea el plan mediante la API y se especifica la moneda como `USD` este por default se establece como `MXN` _. 🤷
- `repeat_every ` **numeric**
	-  Número de unidades tiempo entre los que se cobrará la suscripción. Por ejemplo, `repeat_unit=month` y `repeat_every=2` indica que se cobrará cada 2 meses.
- `repeat_unit ` **string**
	-  Especifica la frecuencia de cobro. Puede ser semanal(`week`), mensual(`month`) o anual(`year`).
- `retry_times ` **numeric**
	- Número de reintentos de cobro de la suscripción. Cuando se agotan los intentos se pone en el estatus determinado por el campo `status_after_retry`.
 - `status_after_retry ` **string**
	- Este campo especifica el status en el que se pondrá la suscripción una vez que se agotaron los intentos. Puede ser: `unpaid` o `cancelled`
- `trial_days ` **numeric**
	- Número de días de prueba por defecto que tendrá la suscripción.

##  Crear un cliente

Ahora crearemos el cliente que queremos suscribir. Lo más importante de este proceso es almacenar el `id` de referencia de Openpay en nuestra tabla de usuarios.

```json
{
   "id":"axapgwwolofnckfui2wx",
   "name":"Mi cliente uno",
   "last_name":null,
   "email":"micliente@gmail.com",
   "phone_number":null,
   "status":"active",
   "balance":0,
   "clabe":"646180109400138692",
   "address":null,
   "creation_date":"2014-02-14T12:30:09-06:00"
}
```

##  Guardar la tarjeta

Lo siguiente es guardar la tarjeta del cliente para usarla en la suscripción. De igual manera, guardamos el `id` de referencia en nuestra tabla de usuarios.

```json
{
   "type":"debit",
   "brand":"visa",
   "address":null,
   "id":"kokzmiiwephcdmq1h2qr",
   "card_number":"1111",
   "holder_name":"Mi cliente uno",
   "expiration_year":"20",
   "expiration_month":"12",
   "allows_charges":true,
   "allows_payouts":true,
   "creation_date":"2014-02-14T13:42:25-06:00",
   "bank_name":"Banamex",
   "customer_id":"axapgwwolofnckfui2wx",
   "bank_code":"002"
}
```

## Suscribir al cliente

Finalmente creamos la suscripción con el `id` del plan, el `id` del cliente y el `id` de la tarjeta. Y almacenamos en nuestra base de datos las columnas que se consideren importantes como: `trial_end_date`,  `id`, etc.

```json
{
   "status":"trial",
   "card":{
      "type":"debit",
      "brand":"visa",
      "address":null,
      "id":"kokzmiiwephcdmq1h2qr",
      "card_number":"1111",
      "holder_name":"Mi cliente uno",
      "expiration_year":"20",
      "expiration_month":"12",
      "allows_charges":true,
      "allows_payouts":true,
      "creation_date":"2014-02-14T13:42:25-06:00",
      "bank_name":"Banamex",
      "customer_id":"axapgwwolofnckfui2wx",
      "bank_code":"002"
   },
   "id":"sfquvei5ya0lwdrd5blo",
   "cancel_at_period_end":false,
   "charge_date":"2014-03-15",
   "creation_date":"2014-02-14T13:48:59-06:00",
   "current_period_number":0,
   "period_end_date":"2014-03-14",
   "trial_end_date":"2014-03-14",
   "plan_id":"psjubnktzpofhakixfkp",
   "customer_id":"axapgwwolofnckfui2wx"
}
```

Listo, hemos creado la suscripción, que se cobrará automáticamente cada mes por $99.99 después del período de prueba.

---- 

## ¿Qué sigue?

Todavía falta configurar un webhook de notificaciones, para actualizar la suscripción del cliente cada vez que se realice una futura transacción.

[1]:	https://www.openpay.mx/en/docs/suscriptions.html
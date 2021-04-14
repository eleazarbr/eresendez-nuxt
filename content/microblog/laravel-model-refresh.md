---
title:
createdAt: 2021-04-08 10:06
tags:
- laravel
---

Pequeños detalles que te ahorran horas de debuggear :smile: Recuerden que existe $model-\>refresh() en Laravel.
<!--more-->

Espero no le suceda a alguien más y recuerde que existe la función `$model->refresh()`. [^1]

> The refresh method will re-hydrate the existing model using fresh data from the database. In addition, all of its loaded relationships will be refreshed as well:

```php
$flight = Flight::where('number', 'FR 900')->first();

$flight->number = 'FR 456';

$flight->refresh();

$flight->number; // "FR 900"
```

[^1]:	[https://laravel.com/docs/8.x/eloquent#refreshing-models][1]

[1]:	https://laravel.com/docs/8.x/eloquent#refreshing-models
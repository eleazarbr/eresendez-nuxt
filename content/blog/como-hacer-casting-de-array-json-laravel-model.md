---
title: "¿Cómo hacer casting de Array & JSON en un Laravel Model?"
summary: "Si tu base de datos tiene un tipo de campo TEXT que contiene JSON serializado, al agregar el atributo array al arreglo de casts, se deserializará automáticamente a una matriz PHP"
date: 2020-02-19 14:29:00
image: 10.png
tags: [Laravel]
---

El tipo de conversión `array` o `collection` es particularmente útil cuando se trabaja con columnas que almacenan JSON serializado. 

> Por ejemplo, si tu base de datos tiene un tipo de campo JSON o TEXT que contiene JSON serializado, al agregar el atributo array al arreglo de conversión, se deserializará automáticamente el atributo a una matriz PHP cuando acceda a él en su modelo Eloquent. [^1]

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'array',
    ];
}
```

Una vez que se define la conversión, puedes acceder al atributo `options` y se deserializará automáticamente a un arreglo PHP. 

```php
$user = App\User::find(1);

$options = $user->options;

$options['key'] = 'value';

$user->options = $options;

$user->save();
```

Es como hacer un  `json_encode($something)` y posteriormente un `json_decode($something, true)`, pero Laravel puede hacerlo por nosotros.

Cuando desees insertar, simple debes hacer:

```php
$user->update([
  'options' => [] // el contenido de mi array
]);
```


[^1]:	https://laravel.com/docs/5.8/eloquent-mutators#array-and-json-casting
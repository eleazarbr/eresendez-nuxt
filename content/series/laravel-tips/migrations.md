---
title: Laravel Migraciones
summary: Uso básico de migraciones en Laravel
date: 2020-05-27 09:55:00
image:
tags: [Laravel, Tip]
---

Lo básico sobre migraciones.

Las migraciones son:

##  Crear una migración

Para crear una migración ejecutamos el comando `make:migration` con un único parámetro: el nombre de la migración.

```bash
php artisan make:migration create_users_table 
```

Generará el siguiente archivo en `database/migrations`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gq_draftem_pickboxes');
    }
}

```

##  Estructura de la migración

En la función `up()` escribimos la estructura de nuestra tabla. Los tipos de columna disponibles los puedes encontrar en [https://laravel.com/docs/7.x/migrations#creating-columns][1].

En la función `down()` escribimos la acciones inversas de `up`. En el ejemplo anterior la función up creará la tabla `users` y la función down eliminará la tabla.

##  Ejecutar la migración

Para correr las migraciones debes ejecutar el comando `migrate`.

```bash
php artisan migrate 
```

Para retroceder a la última migración debes ejecutar el comando `rollback`.

```bash
php artisan migrate:rollback
```


[1]:	https://laravel.com/docs/7.x/migrations#creating-columns
---
title: Laravel Tournament Package (Bracket Generator)
summary: Este paquete de Laravel te permite generar un bracket personalizable para torneos.
date: 2020-12-02 09:00:00
image: WkfDrhxDMC8
tags: [Laravel, Packages]
---

Este paquete de Laravel te permite generar un bracket personalizable para torneos. [^1]

El proyecto se encuentra un poco desactualizado, su última versión es para Laravel 5.8, aún así puede servir de base con ideas para un desarrollo independiente. 

## Instalación

Instalar el paquete con Composer:
```bash
composer require "xoco70/laravel-tournaments"
```

Importar el archivo de configuración:
```bash
php artisan vendor:publish --tag=laravel-tournaments --force
```

Lo anterior genera:
```bash
Copied Directory [/vendor/xoco70/laravel-tournaments/database/seeds] To [/database/seeds]
Copied Directory [/vendor/xoco70/laravel-tournaments/database/factories] To [/database/factories]
Copied Directory [/vendor/xoco70/laravel-tournaments/resources/assets] To [/public/vendor/laravel-tournaments]
Copied File [/vendor/xoco70/laravel-tournaments/config/laravel-tournaments.php] To [/config/laravel-tournaments.php]
Publishing complete.
```

Este proyecto utiliza el sistema de autenticación de Laravel.
```bash
php artisan make:auth
```

## Características

- Generación de bracket de eliminación única
- Eliminación única con generación de ronda preliminar
- Generación de playoffs
- Pelea por el tercer lugar
- Generación del bracket
- Personalizar el tamaño de la ronda preliminar
- Personalizar el número de áreas (1,2,4,8)
- Modificar el bracket sobre la marcha
- Usar equipos en lugar de competidores

## Uso
Para empezar a usar el proyecto podemos ejecutar el seeder y obtener la información de muestra.

```bash
php artisan db:seed --class=LaravelTournamentSeeder
```

Este seeder genera:
- 5 ubicaciones (venues)
- 7 tipos de categorías para los torneos
- 1 torneo
- 2 “campeonatos” es decir, dentro del torneo se llevarán acabo 2 categorías: “junior singles” & “junior teams”
- 5 usuarios en la tabla de `users`  y 5 registros en la tabla de `competitor`

Hasta este momento necesitamos crear previamente: un torneo, categorías, asignar la categoría al torneo (campeonatos) y permitir que los usuarios se registren al campeonato.

### Generar el bracket

Cada campeonato debe de tener un registro de configuración en la tabla `championship_settings`, de lo contrario usará las configuraciones por defecto del paquete. _Mas información en el ChampionshipSettings seeder_.
```bash
$settings = factory(ChampionshipSettings::class)->create(['championship_id' => $championship->id]);
```

**Propiedades importantes**:

- **treeType**: Puede ser 0 (PlayOff) o 1 (Eliminación directa). No soporta _doble eliminación_.
- **fightingAreas**: Un valor restringido a 1, 2, 4 y 8.
- **hasPreliminary**: Permite rounds preliminares. 
- **preliminaryWinner**: Número de competidores que pasarán al siguiente round.
- **seedQuantity**: Número de competidores en el bracket.

Finalmente, con nuestras configuraciones generamos el bracket:

```php
$generation = $championship->chooseGenerationStrategy();
$generation->run();
```

### Bracket view
El paquete nos proporciona las siguientes vistas:

```php
{{-- Preliminary table --}}
@include('laravel-tournaments::partials.tree.preliminary')

{{-- PlayOff --}}
@include('laravel-tournaments::partials.tree.playOff')

{{-- Single Elimination tree --}}
@include('laravel-tournaments::partials.tree.singleElimination', ['hasPreliminary' => 0])

{{-- Fight List --}}
@include('laravel-tournaments::partials.fights')
```

## Resultado
![][image-1]

[^1]:	Laravel Tournaments GitHub Package [https://github.com/xoco70/laravel-tournaments][1]

[1]:	https://github.com/xoco70/laravel-tournaments

[image-1]:	/blog/post/1607039247.png
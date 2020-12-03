---
title: Laravel Tournament Package (Bracket Generator)
summary: Este paquete de Laravel te permite generar un bracket personalizable para torneos.
date: 2020-12-02 09:00:00
image: ryRU-cd1yas
tags: [Laravel, Packages, Draft]
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


[^1]:	Laravel Tournaments GitHub Package [https://github.com/xoco70/laravel-tournaments][1]

[1]:	https://github.com/xoco70/laravel-tournaments

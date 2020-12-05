---
title: Desarrollo de paquetes en Laravel
summary: Cómo desarrollar paquetes en Laravel
date: 2020-11-28 11:25:00
updated_at: 2020-12-04 6:05:00
image: u2Ru4QBXA5Q
tags: [Laravel, Composer, Draft]
---

## Creando un paquete PHP
Un tema que he querido aprender desde hace mucho tiempo y al parecer en estos días ya podré darle continuidad :smile:. _Basado en el curso “Laravel Package Training” de Spatie_. [^1] 

### Crear un paquete PHP usando la plantilla 
Para empezar es necesario clonar la plantilla “Package Skeleton PHP”. [^2]

Recomendaciones:
- Usar un archivo `.editorconfig` para definir un estándar de reglas para el IDE entre colaboradores [^3]
- Usar el archivo `.gitattributes` y el atributo `export-ignore` para excluir ciertos archivos y carpetas en un _release_ [^4]  
- Usar `.php_cs.dist` para establecer un _code styling_
- Crear y mantener un archivo `CHANGELOG.md` para documentar todos los cambios que se realicen en el paquete [^5]
	- Usar Semantic Versioning [^6]
- Crear y mantener un archivo `CONTRIBUTING.md` para definir todas las reglas que las personas interesadas en colaborar deben de seguir.
- Cada paquete open-source debe de contener el archivo `LICENSE.md`. Existen muchas licencias, por ejemplo The MIT License.
- Mantener el `README.md` 

**composer.json**

La plantilla contiene variables en el composer.json que serán reemplazadas _ver `configure-skeleton.sh`_. 

Recordar algunas secciones importantes del archivo como:
- `"require"`: Por ejemplo para requerir el uso de cierta versión de PHP.
-  `"require-dev"`: Para establecer las dependencias para desarrollar el paquete, por ejemplo las herramientas para arreglar el estilo del código y ejecutar pruebas unitarias.
- `"autoload"` y `"autoload-dev"`: Para establecer el namespace donde se ubica el source code y las pruebas.
- `"scripts"`: Para definir comandos propios de nuestro paquete  `composer test` o `composer format`.

### Configurando el namespace y añadiendo código


[^1]:	Laravel Package Training -[https://spatie.be/videos/laravel-package-training][1]

[^2]:	El repositorio de la plantilla - [https://github.com/spatie/package-skeleton-php][2]

[^3]:	EditorConfig [https://editorconfig.org/][3]

[^4]:	.gitattributes: [https://madewithlove.com/gitattributes/][4]

[^5]:	Changelog Best Practices - [https://keepachangelog.com/en/1.0.0/][5]

[^6]:	Introducción a Semantic Versioning - [https://www.geeksforgeeks.org/introduction-semantic-versioning/][6]

[1]:	https://spatie.be/videos/laravel-package-training
[2]:	https://github.com/spatie/package-skeleton-php
[3]:	https://editorconfig.org/
[4]:	https://madewithlove.com/gitattributes/
[5]:	https://keepachangelog.com/en/1.0.0/
[6]:	https://www.geeksforgeeks.org/introduction-semantic-versioning/

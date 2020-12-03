---
title: Secciones no visibles del Bulma Modal (full-height) en iOS
summary: Un UX issue en Safari iOS en el Bulma Modal.
date: 2020-12-01 17:22:00
image:
tags: [Bulma]
---

Al abrir un modal relativamente grande en iOS Safari, aparece una barra inferior y superior del navegador. Como resultado, las barras de herramientas bloquean una parte del encabezado y footer del modal, lo que dificulta el uso de botones en dichas secciones. [^1]

#### Solución #1

Modificar la variable `$modal-card-spacing`  cuyo default value es `40px`.

Para sobre escribir las variables es necesario definirlas antes de importar Bulma, por ejemplo:

```scss
$modal-card-spacing: 80px; // default 40px;
@import "~buefy/src/scss/buefy-build";
```

#### Local Testing con LambdaTest

LambaTest es una alternativa a BrowserStack. La idea es probar el cambio especifico en la UI como si estuvieramos en un determinado sistema operativo antes de subirlo a producción. [^2]

Resultado: 
![Bulma Modal resultado en iOS][image-1]

[^1]:	https://github.com/jgthms/bulma/issues/1874
	GitHub Issue: Is it possible to make Modal shrink upon Mobile Browser tool bar pop up? #1874

[^2]:	Local Testing en MacOS [https://www.lambdatest.com/support/docs/local-testing-macos/][1]

[1]:	https://www.lambdatest.com/support/docs/local-testing-macos/

[image-1]:	/blog/post/1606934440.png
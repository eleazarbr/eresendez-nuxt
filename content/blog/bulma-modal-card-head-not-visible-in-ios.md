---
title: Secciones no visibles del Bulma Modal (full-height) en iOS
summary: Un UX issue en Safari iOS en el Bulma Modal.
date: 2020-12-01 17:22:00
image:
tags: [Bulma, Draft]
---

Al abrir un modal relativamente grande en iOS Safari, aparece una barra inferior y superior del navegador. Como resultado, las barras de herramientas bloquean una parte del encabezado y footer del modal, lo que dificulta el uso de botones en dichas secciones. [^1]

#### Solución #1

Modificar la variable `$modal-content-spacing-mobile`  cuyo default value es `160px`.

Para sobre escribir las variables es necesario definirlas antes de importar Bulma, ejemplo:

```scss
$modal-content-spacing-mobile: 360px; // default 160px;
@import "~buefy/src/scss/buefy-build";
```

#### TODO
- Probar solución usando LambdaTest: 
	- [https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/][1]
	- [https://www.lambdatest.com/support/docs/local-testing-macos/][2]

[^1]:	https://github.com/jgthms/bulma/issues/1874
	GitHub Issue: Is it possible to make Modal shrink upon Mobile Browser tool bar pop up? #1874

[1]:	https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/
[2]:	https://www.lambdatest.com/support/docs/local-testing-macos/
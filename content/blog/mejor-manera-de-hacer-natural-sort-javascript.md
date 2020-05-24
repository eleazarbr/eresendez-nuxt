---
title: "La mejor manera de hacer natural-sort en Javascript"
summary: "Bradley T. comparte una manera de hacer natural-sort en JavaScript con una sola línea de código."
date: 2020-03-10 16:36:00
image:
external\_url:
  url: http://fuzzytolerance.info/blog/2019/07/19/The-better-way-to-do-natural-sort-in-JavaScript/
  site: http://fuzzytolerance.info
tags: [JavaScript]
---

El método [sort()][1] de JavaScript utiliza un algoritmo `in-place` que convierte los elementos de un arreglo en Strings.  El modo de ordenación por defecto responde a la posición del valor del string de acuerdo a su valor Unicode. [^1]

```javascript
const array1 = [1, 30, 4, 21, 100000]
array1.sort()
console.log(array1)

// [1, 100000, 21, 30, 4]
```

¿1, 100000, 21? 😁

En cambio, el _Natural Sort_ ordena strings alfabéticamente, excepto que los números de varios dígitos se tratan atómicamente, es decir, como si fueran un solo carácter. [^2]

Es por eso que buscando una solución a ese problema, encontré la siguiente entrada de Bradley T. Utilizando el método  `localeCompare()`.

```javascript
const items =  ['3rd', 'Apple', '24th', '99 in the shade', 'Dec', '10000', '101', '$1.23']
items.sort((a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}))
console.log(items)

// [ "$1.23", "3rd", "24th", "99 in the shade", "101", "10000", "Apple", "Dec" ]
```

Orden natural.

[^1]:	[https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos\_globales/Array/sort][2]

[^2]:	[https://en.wikipedia.org/wiki/Natural\_sort\_order][3]

[1]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[2]:	https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/sort "Array.prototype.sort()"
[3]:	https://en.wikipedia.org/wiki/Natural_sort_order "Natural Sort Order"
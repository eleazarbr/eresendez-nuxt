La función [sort()][1] de javascript utiliza un algoritmo `in-place` que convierte los elementos en strings y luego compara sus secuencias de valores de unidades de código UTF-16.

```javascript
const array1 = [1, 30, 4, 21, 100000]
array1.sort()
console.log(array1)

// [1, 100000, 21, 30, 4]
```

En cambio, el Natural Sort es una ordenación de strings en orden alfabético, excepto que los números de varios dígitos se tratan atómicamente, es decir, como si fueran un solo carácter – [Natural Sort Order][2].

Es por eso, que buscando una solución a ese problema, encontré la siguiente entrada de Tobin Bradley.

La solución: el método `localeCompare()`.

```javascript
const items =  ['3rd', 'Apple', '24th', '99 in the shade', 'Dec', '10000', '101', '$1.23']
items.sort((a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}))
console.log(items)

// [ "$1.23", "3rd", "24th", "99 in the shade", "101", "10000", "Apple", "Dec" ]
```



[1]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[2]:	https://en.wikipedia.org/wiki/Natural_sort_order
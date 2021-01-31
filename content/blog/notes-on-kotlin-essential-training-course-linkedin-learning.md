---
title: Kotlin Essential Training - LinkedIn Learning (Notas)
summary: Notes on things I've learned in this course. 
date: 2021-01-29 19:38:00
image: lqcvMiBABHw
tags: [Courses]
---

## Fun
- Las `;` para terminar un statement **no son** obligatorias. El compilador de Kotlin usualmente reconoce el final de un statement. La regla general en Kotlin es no usar semicolons.

## Data types
### Numeric data types
Para declarar variables:

```kt
var count: Int = 0 // this is a mutable variable
val number: Int = 42 // this is an immutable variable

// El tipo de la variable puede ser omitido ya que puede ser inferido.
var otherNumber = 43;
```

**Integers**
- Int - 32 bits - 1234
- Long 64 bits - 1234L
- Byte - 8 bits - 127
- Short - 16 bits - 32767

```kt
val myLong: Long = 300000000L
val myByte: Byte 127
```

**Floating Point**
- Double - 64 bits - 1234.56
- Float - 32 bits - 1234.56F

```kt
val myDouble: Double = 98.6
val myFloat: Float = 12.2F
val alsoDouble = 101.5
```

**Conversiones**
```kt
val asInt = alsoDouble.toInt()
val asFloat = myLong.toFloat()
```

### Boolean and char data types
- Char `var letter: Char = 'A'`
	- Recordar que los números-strings no son números, es necesario hacer casting.
- ASCII `var tab = '\t'`
- Unicode `var infinity = '\u221E'` 

```kt
val lineFeed = 10.toChar()
println("line feed = $lineFeed next line")

// Booleans
var willExcercise: Boolean = false
var hasSomething = true

val bigNumber = 1_000_000
val smallNumber = 2
println("is big bigger = ${bigNumber > smallNumber}")
```

### String tricks and traps


## Links
- [Curso Kotlin Essential Training][1] 
- [What is the history of Kotlin][2]

[1]:	https://www.linkedin.com/learning/kotlin-essential-training/numeric-data-types
[2]:	https://www.quora.com/What-is-the-history-of-Kotlin
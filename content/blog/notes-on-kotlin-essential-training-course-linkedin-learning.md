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
Ejemplos:

```kt
fun main() {
    val greeting: String = "Hello there"
    val owe = 50

    val janet = "I owe Janet \$$owe dollars"
    println(janet)

    val infinity = "The infinity symbol is \u221E"
    println(infinity)

    println("[$greeting] is ${greeting.length} characters long")

    var bad = greeting.get(2)
    val letter = greeting[1]

    val compare1 = "beta"
    val compare2 = "alpha"
    println("${compare1.compareTo(compare2)}")

    val sub = greeting.subSequence(6, 9)
    println("sub = $sub")

    for(single in greeting) {
        print("$single ")
    }

    val myString = """
    Kotlin is fun.
    Kotlin is pragmatic.
    """
    println(myString)
}
```

## Control Flow
Kotlin no usa operadores ternarios. Statements vs. expressions.

```kt
val bigger = 1000
val smaller = 1
val max = bigger > smaller ? bigger : smaller // won't compile

// instead
val max = if (bigger > smaller) bigger else smaller

// another sample
val age = 35
val boardGroup = when (age) {
  in 0..18 -> "family"
  in 65..200 -> "senior"
  else -> "regular" 
}

println("You are in the $boardGroup group.")
```

### The if expression

```kt
fun main() {
    val bigger = 100
    val smaller = 1
    val max = if (bigger > smaller) bigger else smaller

    if (bigger > 10) {
        println("Greater than 10!")
    } else if (bigger > 100) {
        println("Greater than 100!")
    } else {
        println("Not too big")
    }

    val bucket: Any = if (number > 100) {
        "alpha"
    } else if (number > 90) {
        println("Less than 90")
        2
    } else if (number > 80) {
        println("Less than 80")
    } else {
        1
    }
}
```

### The when expression
Similar a un switch-case statement.

```kt

fun main() {
    val x = 1
    when(x) {
        1 -> println("x == 1")
        2 -> println("x == 2")
        3,4 -> println("x == 3 or 4")
    }

    val card = Suit.Spade
    val y = when(card) {
        Suit.Club, Suit.Spade -> println("black card")
        Suit.Diamond, Suit.Heart -> println("red card")
    }

    val name = "Troy"
    val lastName = when (name) {
        "Hattan" -> "Shobokshi"
        "Todd" -> "Miller"
        "Troy" -> "Miles"
        else -> {
            "Unknown"
        }
    }
    println("$name $lastName")

    val ageType = when (x) {
        in 0..1 -> "baby"
        in 2..4 -> "toddler"
        in 5..12 -> "kid"
        in 13..19 -> "teenager"
        in 20..64 -> "adult"
        else -> "senior"
    }
    println("You are a $ageType")
}
```

### Loops
```kt

fun main() {
//    c-style loop
//    for (int i=0; i < 10; i++) {
//        println("i = $i")
//    }

    for (i in 1..10) {
        println("i = $i")
    }

    val students = listOf("Janet", "Daisy", "Veronica", "Fernanda")
    for (student in students) {
        println("Current student is $student")
    }

    for ((index, student) in students.withIndex()) {
        println("Student #${index + 1} is $student")
    }

    println("while")
    var count = 5
    while (count > 0) {
        println(count)
        count--
    }

    println("do while")
    do {
        println(count)
        count++
    } while (count < 5)

    println("break")
    while (count > 0) {
        if (count % 2 == 0) break
        println(count)
        count--
    }
}
```

### Nulls and smart casting
```kt
data class Person(var firstName: String, var lastName: String)

fun main() {
//    var person1: Person = null
    var person2: Person? = null

    val greeting: String? = "Hello there"
    if (greeting != null) {
        println("Joe says: '$greeting'")
    }

    println("greeting length = ${greeting?.length}")

    val len = greeting?.length ?: 0
    println("Length is $len")

    // exception when greeting is null
    val badLen = greeting!!.length

    val safeGreeting: String? = greeting as? String
}

```

## Collections and sequences


## Links
- [Curso Kotlin Essential Training][1] 
- [What is the history of Kotlin][2]

[1]:	https://www.linkedin.com/learning/kotlin-essential-training/numeric-data-types
[2]:	https://www.quora.com/What-is-the-history-of-Kotlin
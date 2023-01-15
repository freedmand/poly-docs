---
title: Documentation
---

# Introduction

Welcome to the work-in-progress, experimental, subject-to-change documentation for the Poly programming language.

Poly endeavors to unify web languages, but these docs in their current form focus on the basic syntax of the Poly language and are not yet oriented to the web specifically — aside from minor considerations like using a `Number` type to align with JavaScript.

## Variable declarations

Variables are assigned with `let` and `var`:

```poly
let name = "Poly";
var currentHour = 12;
var toggle = true;
```

`let` is used to initialize constant values that cannot change and `var` is for dynamic variables that can change. `let` should be favored and used wherever possible; `var` should be used only when needed.

## Comments

There are two types of comments in Poly:
* Normal comments, expressed with `//` and used to explain code
* Doc comments, expressed with `///` which are used to document functions or variables. Downstream tooling will use doc comments to create documentation for codebases.

Poly only has line comments. There is no mechanism for inline comments within lines of code.

```poly
// This is a normal comment
let x = 5; // it can go at the end of lines of code

/// Using three slashes makes it a special doc comment
/// which can be used to document functions or variables
let y = 6;
```

## Basic types

Types can be added with a `: Type` syntax in variable declarations. In Poly, types are always capitalized, as opposed to variables which are not. Here are some of the basic types:

```poly
// Text is used for text data
// (called String in many other languages)
let content: Text = "The horse rode through the night.";

// Number is used for numbers (both integers and reals)
let year: Number = 2023;

// Logic is used for boolean data
let isFriday: Logic = false;
```

## Functions

Functions are defined with the `fn` keyword and specify arguments, return types, and a function body. Inside functions, the `return` keyword is used to end the function and return values.

```poly
fn add(x: Number, y: Number) -> Number {
  return x + y;
}
```

Note the `-> Number` syntax. This soft arrow is used to denote the return type. The return type can be omitted if it can be inferred.

## Inline functions

Poly has a special syntax for inline functions:

```poly
fn add(x: Number, y: Number) => x + y;
```

The return type can be specified as well (in which case it goes before the `=>`):

```poly
fn add(x: Number, y: Number) -> Number => x + y;
```

## Function expressions

Functions can be declared with `let` as well:

```poly
let add(x: Number, y: Number) => x + y;
```

Declaring a function as an expression does not hoist it to the top of the scope, similar to JavaScript function expressions.

## Closures

The above way of declaring a function expression is essentially creating a closure under the hood. It is syntactically equivalent to the following:

```poly
let add = (x: Number, y: Number) => x + y;
```

Closures can be declared and used anonymously as well:

```poly
let y = ((x: Number) => x * 2)(2); // y == 4
```

## Generics

In more traditional programming languages, generics are specified with a special meta syntax. In Poly, types are values like anything else. Generics are specified as initial parameters in functions prefixed with `type`:

```poly
fn identity(type T, value: T) -> T {
  return value;
}
```

When generic functions are invoked, the type parameter is inferred if possible:

```poly
identity(23); // 23
```

But, as it is essentially a parameter, it can be explicitly specified as well:

```poly
identity(T: Number, 23); // 23
```

## Advanced types

Union types allow expressing a type can have multiple different shapes:

```poly
type NumberOrString = Number | String;
```

Generic types can be specified as well:

```poly
type Option(type T) => Some(T) | None;
```

Note that this shorthand syntax applies to types as well as functions. The above is syntactically equivalent to:

```poly
type Option = (type T) => Some(T) | None;
```

This kind of type can be declared easily:

```poly
let status: Option(Number) = Some(200);
```
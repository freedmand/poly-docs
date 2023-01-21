---
title: About
---

# About

Welcome! Poly is a work-in-progress programming language with the ambitious resolve to reimagine creating for the web. It is being developed (slowly) by [Dylan Freedman](https://dylanfreedman.com/) as a side project.

In the long-term, Poly aims to provide:

- a system for laying out web content that unifies HTML, CSS, and JS
- an optimizing compiler that can produce efficient websites of all kinds
- a developer-friendly experience
- a language that's easier to learn than HTML, CSS, and JS (and various web frameworks)

As of now, the focus is on prototyping and solidifying the core language syntax. This website's docs catalog the current thinking.

## Language values

For its creator, Poly is a journey over nearly two decades of programming experience — combing over features admired in other languages and trying to elegantly combine them. There are some faetures that speed up development, some that promote code safety, and others that have an aesthetic appeal.

Poly adopts much of its syntactic approach from JavaScript. Its imperative and functional blend hits a sweet spot. But for its lack of inherent type safety, Poly looks to TypeScript, OCaml, and Zig:

- [TypeScript](https://www.typescriptlang.org/) has a beautiful syntax for laying out types and demonstrates the power of static type safety for JavaScript
- [OCaml](https://ocaml.org/) has a rigid but expressive type system. With algebraic data types and exhaustive pattern matching, programs that compile tend to be delightfully bug-free. [ReScript](https://rescript-lang.org/) is a successful adaptation of OCaml to the web
- [Zig](https://ziglang.org/) is a modern successor to C that successfully shares an innovative and daring idea: compile-time. By treating types as first-class values and providing a mechanism to run functions internally during compilation, Zig achieves something remarkable. Generics and other complicated type transforms without the syntactic overhead.

## Isn't this just TypeScript?

TypeScript is superset of JavaScript with an additional type syntax that compiles to plain JavaScript.

Poly is a language that will compile to HTML, CSS, and JavaScript. But even considering only the base language, Poly has a more expressive type system than TypeScript, treating types as values that can be run in functions like anything else. This simplifies considerations like generics and reduces the complexity of the language because no special meta syntax over types is needed.

## Why the name Poly?

It's short for polyglot (one who knows several languages). It captures the ideal of having a web programming language abstract away HTML, CSS, and JS in a unified syntax that the compiler can optimize across.

## Will it interoperate with JS, HTML, and CSS?

It must to have any shot at adoption. But it's far away on the roadmap.

## Why design a new language?

Wouldn't it be more productive to contribute to other languages? Maybe it would. And if an alternative language that satisfies similar objectives existed, it would be great to use and help develop that one instead. The [Svelte](https://svelte.dev/) project comes close and has had fantastic success.

But ultimately, nothing has yet hit the balance of aims Poly targets. Exceedingly robust type safety. A friendly syntax to newcomers. Compiling to framework-free websites — which optimize _across_ languages.

Poly has been in the works since 2016, and frustratingly no one has since stolen the idea and executed it in the desired way. Most importantly perhaps, Poly is a zealous endeavor of great fun, a learning experience, and a tribute. There is much prior work to be in awe of, and this language certainly could not come together without some truly innovative past projects.

Call it passion. Call it [madness](https://xkcd.com/927/). But here we are.

---
layout: archive
title: "Lean Tutorial at POPL 2017"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

A tutorial on Lean is scheduled as associated event of the
[44th ACM SIGPLAN Symposium on Principles of Programming Languages (POPL)]
(http://conf.researchr.org/home/POPL-2017), which will
take place in Paris at 16 January 2017.

[Lean]({{site.url}}/index) is a new open source theorem prover being
developed at Microsoft Research, Carnegie
Mellon University, and University of Washington.
*Lean* is a new theorem prover that aims to
bridge the gap between interactive and automated theorem proving, by
situating automated tools and methods in a framework that supports
user interaction and the construction of fully specified axiomatic
proofs. The goal is to support both reasoning about complex systems
and mathematical reasoning, and to verify claims in both domains.

The purpose of the tutorial is to help participants to get acquainted
with Lean, and extend it using its meta programming capabilities.
The tutorial is divided in three parts:
introduction, advanced features, and writing and debugging tactics.

In the first part, we will introduce Lean logic and language with a
series of examples. Participants will be able to execute and modify
all examples using any modern web browser.
The material is based on the book [Theorem Proving in Lean](/theorem_proving_in_lean).
Participants are encouraged to install the Lean native IDE (based on
Emacs). The native IDE provides functionality such as: continuous error
checking, auto-completion, and visualization features.
Participants are expected to have a notebook or tablet with a
Javascript enabled web-browser installed.  Participants interested in
the native IDE must have a Linux (Ubuntu preferred), OS X or Windows 8/10
notebook, and [Emacs 24.x](https://www.gnu.org/software/emacs) or [Visual Studio Code](https://code.visualstudio.com) installed.

In the second part, we cover advanced features.
It includes topics such as: type classes, implicit coercions,
overloading, code extraction, and an introduction to the tactic framework.
[All the material](https://github.com/leanprover/presentations/tree/master/20170116_POPL) is available online, and participants
can access it before and after the tutorial.

In the final part, we describe how to write and debug non trivial tactics.
Lean tactics and other meta programs are implemented using the same language
used to write definitions and prove lemmas. The material is based on
the book [Programming in Lean](/programming_in_lean).
We will describe how to use and extend the Lean simplifier.
We will also provide a short introduction to a resolution prover
implemented in Lean.

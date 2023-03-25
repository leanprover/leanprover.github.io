---
layout: archive
title: "Lean Tutorial at CADE 2015"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

A half-day tutorial on Lean is scheduled as associated event of the
[25th International Conference on Automated Deduction
(CADE-25)](http://conference.mi.fu-berlin.de/cade-25/wtc), which will
take place in Berlin at the start of August 2015.


[Lean]({{site.url}}/index) is a new open source theorem prover being
developed at Microsoft Research, and its standard library at Carnegie
Mellon University. The *Lean* is a new theorem prover that aims to
bridge the gap between interactive and automated theorem proving, by
situating automated tools and methods in a framework that supports
user interaction and the construction of fully specified axiomatic
proofs. The goal is to support both mathematical reasoning and
reasoning about complex systems, and to verify claims in both domains.

The purpose of the tutorial is to help participants to get acquainted
with Lean, and use it directly or embed it into their own systems.
Participants are assumed to have only a basic grounding in logic and
(functional) programming. The tutorial is divided in three parts:
introduction, advanced features, and API.

In the first part, we will introduce Lean logic and language with a
series of examples. Participants will be able to execute and modify
all examples using any modern web browser. The course material will be
based on the one used at the [interactive theorem proving
course](../tutorial/index.html) at
[CMU](http://www.cs.cmu.edu/~emc/15815-s15/syllabus.html).

We will also describe how to install the Lean native IDE (based on
Emacs), and demonstrate basic functionality such as: continuous error
checking, auto-completion, and visualization features. In the end of
the first part, participants will be able to write simple definitions
and prove properties about them using the web and/or native
IDEs. Participants are expected to have a notebook or tablet with a
Javascript enabled web-browser installed.  Participants interested in
the native IDE must have a Linux (Ubuntu preferred), OS X or Windows 8
notebook, and Emacs 24.x installed.

In the second part, we cover advanced features and the Lean
standard library.  It includes topics such as: module system,
declarative proof style, type classes, implicit coercions,
overloading, calculational proofs, notation declaration,
and the tactic framework. The
functionality will be demonstrated using fragments of the Lean standard
library (e.g., category and homotopy type theory). Participants will
be able to execute and modify non-trivial specifications written using
Lean. Again, all the material will be available online, and participants
will be able to access it before and after the tutorial.

In the final part, we cover the Lean API. This part is relevant
for any participant interested in embedding Lean into their own
applications and/or extending Lean. We will focus on the Lua bindings
because they are easier to use than the C++ ones, and can be embedded
into Lean specifications. We will demonstrate how to access Lean
automation (e.g., the higher-order unification procedure, the rewriter,
and decision procedures) programmatically; and extend Lean with
new decision procedures and tactics. Since Lua scripts can be embedded
in a Lean specification, participants will be able to interactively
execute and modify all examples using Lean's web IDE or native IDE.

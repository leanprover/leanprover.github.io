---
layout: archive
---

<div class="main-column">
<div class="left-column">
<div id="front-page-copy">
<p>
Lean is a modern programming language and
theorem prover designed for building critical
software, and mechanized reasoning.
It is built on a small kernel type theory,
with a focus on automation and performance.
</p>
</div>

<div id="front-page-features">
<h3>Featuring:</h3>
<ul>
  <li>dependent types</li>
  <li>smt-inspired automation</li>
  <li>state of the art congruence closure</li>
  <li>powerful type inference, and type classes</li>
  <li>efficient and expressive meta programming</li>
  <li>efficient virtual machine and native code generator</li>
  <li>built-in io framework and ffi</li>
</ul>
</div>
</div>

<div class="right-column">
<h5>Hello Lean!</h5>
<div class="front-page-example">
{% highlight lean %}
import system.io

variable [io.interface]

def main : io unit :=
  io.put_str "Hello Lean!"

{% endhighlight %}
</div>
<h5>List Lemma</h5>
<div class="front-page-example">
{% highlight lean %}
import data.list
open list

lemma app_length (A : Type) (xs : list A) :
  length (xs ++ ys) = length xs + length y :=
    by iblast
{% endhighlight %}
</div>
<h5>Constructor Tactic</h5>
<div class="front-page-example">
{% highlight lean %}
meta def constructor : tactic unit :=
 do tgt <- target,
 ctors <- get_constructors_for,
 try_constructor ctors
{% endhighlight %}
</div>
<div id="more-examples">
<a href="/">More Examples</a>
</div>
</div>
</div>

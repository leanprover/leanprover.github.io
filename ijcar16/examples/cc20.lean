/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
open nat subtype

definition f (x : nat) (y : {n : nat | n > x}) : nat :=
x + elt_of y

set_option blast.strategy "cc"

example (h : nat → nat) (a b c d : nat) (Ha : h c > h a) (Hb : h d > h b)
        : h a = h b → c = d → f (h a) (tag (h c) Ha) = f (h b) (tag (h d) Hb) :=
by blast

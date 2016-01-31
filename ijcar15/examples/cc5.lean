/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

/-
The implemented procedure supports arbitrary equivalence relations.
In the following example, it is using the relation ↔
-/

example (a b c : Prop) : (a ↔ b) → ((a ∧ (c ∨ b)) ↔ (b ∧ (c ∨ a))) :=
by blast

/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
import data.unit
open unit

set_option blast.strategy "cc"

example (a b : unit) : a = b :=
by blast

example (a b : nat) (h₁ : a = 0) (h₂ : b = 0) : a = b → h₁ == h₂ :=
by blast

constant inv' : ∀ (a : nat), a ≠ 0 → nat

example (a b : nat) (h₁ : a ≠ 0) (h₂ : b ≠ 0) : a = b → inv' a h₁ = inv' b h₂ :=
by blast

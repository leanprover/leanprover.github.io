/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

example (a b c d : Prop)
     [d₁ : decidable a] [d₂ : decidable b] [d₃ : decidable c] [d₄ : decidable d]
   : (a ↔ b) → (c ↔ d) → ((if (a ∧ c) then true else false) ↔ (if (b ∧ d) then true else false)) :=
by blast

example (a b c d : Prop) (x y z : nat)
     [d₁ : decidable a] [d₂ : decidable b] [d₃ : decidable c] [d₄ : decidable d]
   : (a ↔ b) → (c ↔ d) → x = y → ((if (a ∧ c ∧ a) then x else y) = (if (b ∧ d ∧ b) then y else x)) :=
by blast

/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
open nat
set_option blast.strategy "cc"

example
        (a₁ a₂ b₁ b₂ c d : nat) :
        a₁ = c → a₂ = c →
        b₁ = d → d  = b₂ →
        a₁ + b₁ + a₁ = a₂ + b₂ + c :=
by blast

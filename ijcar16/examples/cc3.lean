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

constant f (a b : nat) : a > b → nat
constant g : nat → nat

example
        (a₁ a₂ b₁ b₂ c d : nat)
        (H₁ : a₁ > b₁)
        (H₂ : a₂ > b₂) :
        a₁ = c → a₂ = c →
        b₁ = d → d  = b₂ →
        g (g (f a₁ b₁ H₁)) = g (g (f a₂ b₂ H₂)) :=
by blast

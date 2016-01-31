/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
import data.list
open perm
set_option blast.strategy "cc"

example (a b : nat) : a = b → (b = a ↔ true) :=
by blast

example (a b c : nat) : a = b → b = c → (true ↔ a = c) :=
by blast

example (l₁ l₂ l₃ : list nat) : l₁ ~ l₂ → l₂ ~ l₃ → (true ↔ l₁ ~ l₃) :=
by blast

example (l₁ l₂ l₃ : list nat) : l₁ ~ l₂ → l₂ = l₃ → (true ↔ l₁ ~ l₃) :=
by blast

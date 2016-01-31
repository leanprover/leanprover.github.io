/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
import data.list
set_option blast.strategy "cc"
open perm list

/-
The implemented procedure supports arbitrary equivalence relations.
In the following example, it is using the permutation relation ~ for lists
-/

example (A : Type) (l₁ l₂ l₃ l₄ l₅ : list A) :
        (l₁ ~ l₂) → (l₃ ~ l₄) → (l₁ ++ l₃ ++ l₅ ++ l₄ ++ l₁) ~ (l₂ ++ l₄ ++ l₅ ++ l₃ ++ l₂) :=
by blast

example (A : Type) (l₁ l₂ l₃ l₄ l₅ : list A) :
        (l₁ ~ l₂) → (l₃ = l₄) → (l₁ ++ l₃ ++ l₅ ++ l₄ ++ l₁) ~ (l₂ ++ l₄ ++ l₅ ++ l₃ ++ l₂) :=
by blast

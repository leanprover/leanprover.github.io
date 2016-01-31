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

constant f {A : Type} : A → A → A
constant g : nat → nat

example (a b c : nat) : a = b → g a == g b :=
by blast

example (a b c : nat) : a = b → c = b → f (f a b) (g c) = f (f c a) (g b) :=
by blast

example (a b c d e x y : nat) : a = b → a = x → b = y → c = d → c = e → c = b → a = e :=
by blast

/- Our actual procedure supports arbitrary equivalence relations -/

open perm

example (a b c d : list nat) : a ~ b → c ~ b → d ~ c → a ~ d :=
by blast

example (a b c d : list nat) : a ~ b → c ~ b → d = c → a ~ d :=
by blast

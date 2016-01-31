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

/- Our congurence closure procedure handles symmetric relations automatically. -/
example (a b : nat) : (a = b) ↔ (b = a) :=
by blast

example (a b : nat) : (a = b) = (b = a) :=
by blast

example (a b : nat) : (a = b) == (b = a) :=
by blast

open perm

example (a b : list nat) : (a ~ b) ↔ (b ~ a) :=
by blast

example (a b : list nat) : (a ~ b) = (b ~ a) :=
by blast

example (a b : list nat) : (a ~ b) == (b ~ a) :=
by blast

example (p : Prop) (a b : nat) : a = b → b ≠ a → p :=
by blast

example (a b : Prop) : (a ↔ b) → ((b ↔ a) ↔ (a ↔ b)) :=
by blast

example (a b c : nat) : b = c → (a = b ↔ c = a) :=
by blast

example (a b c : list nat) : b ~ c → (a ~ b ↔ c ~ a) :=
by blast

example (a b c : list nat) : b ~ c → ((a ~ b) = (c ~ a)) :=
by blast

/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

axiom vector.{l} : Type.{l} → nat → Type.{l}
axiom app : Π {A : Type} {n m : nat}, vector A m → vector A n → vector A (m+n)

example (n1 n2 n3 : nat) (v1 w1 : vector nat n1) (w1' : vector nat n3) (v2 w2 : vector nat n2) :
        n1 = n3 → v1 = w1 → w1 == w1' → v2 = w2 → app v1 v2 == app w1' w2 :=
by blast

example (n1 n2 n3 : nat) (v1 w1 : vector nat n1) (w1' : vector nat n3) (v2 w2 : vector nat n2) :
        n1 == n3 → v1 = w1 → w1 == w1' → v2 == w2 → app v1 v2 == app w1' w2 :=
by blast

example (n1 n2 n3 : nat) (v1 w1 v : vector nat n1) (w1' : vector nat n3) (v2 w2 w : vector nat n2) :
        n1 == n3 → v1 = w1 → w1 == w1' → v2 == w2 → app w1' w2 == app v w → app v1 v2 = app v w :=
by blast

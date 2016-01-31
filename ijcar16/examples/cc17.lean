/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

example (a b c a' b' c' : nat) : a = a' → b = b' → c = c' → a + b + c + a = a' + b' + c' + a' :=
by blast

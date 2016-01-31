/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

example (a b c : Prop) : a = b → b = c → (a ↔ c) :=
by blast

example (a b c : Prop) : a = b → b == c → (a ↔ c) :=
by blast

example (a b c : nat) : a == b → b = c → a == c :=
by blast

example (a b c : nat) : a == b → b = c → a = c :=
by blast

example (a b c d : nat) : a == b → b == c → c == d → a = d :=
by blast

example (a b c d : nat) : a == b → b = c → c == d → a = d :=
by blast

example (a b c : Prop) : a = b → b = c → (a ↔ c) :=
by blast

example (a b c : Prop) : a == b → b = c → (a ↔ c) :=
by blast

example (a b c d : Prop) : a == b → b == c → c == d → (a ↔ d) :=
by blast

definition foo (a b c d : Prop) : a == b → b = c → c == d → (a ↔ d) :=
by blast

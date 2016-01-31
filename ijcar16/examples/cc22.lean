/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

example (C : nat → Type) (f : Π n, C n → C n) (n m : nat) (c : C n) (d : C m) :
        f n == f m → c == d → n == m → f n c == f m d :=
by blast

example (f : nat → nat → nat) (a b c d : nat) :
        c = d → f a = f b → f a c = f b d :=
by blast

example (f : nat → nat → nat) (a b c d : nat) :
        c == d → f a == f b → f a c == f b d :=
by blast

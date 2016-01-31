/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
set_option blast.strategy "cc"

example (p : nat → nat → Prop) (f : nat → nat) (a b c d : nat) :
        p (f a) (f b) → a = c → b = d → b = c → p (f c) (f c) :=
by blast

example (p : nat → nat → Prop) (a b c d : nat) :
        p a b → a = c → b = d → p c d :=
by blast

example (p : nat → nat → Prop) (f : nat → nat) (a b c d : nat) :
        p (f (f (f (f (f (f a))))))
          (f (f (f (f (f (f b)))))) →
        a = c → b = d → b = c →
        p (f (f (f (f (f (f c))))))
          (f (f (f (f (f (f c)))))) :=
by blast

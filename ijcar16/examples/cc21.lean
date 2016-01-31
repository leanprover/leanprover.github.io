/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
open subtype
set_option blast.strategy "cc"

example (f g : Π {A : Type₁}, A → A → A) (h : nat → nat) (a b : nat) :
        h = f a → h b = f a b :=
by blast

example (f g : Π {A : Type₁}, A → A → A) (h : nat → nat) (a b : nat) :
        h = f a → h b = f a b :=
by blast

example (f g : Π {A : Type₁} (a b : A), {x : A | x ≠ b}) (h : Π (b : nat), {x : nat | x ≠ b}) (a b₁ b₂ : nat) :
        h = f a → b₁ = b₂ → h b₁ == f a b₂ :=
by blast

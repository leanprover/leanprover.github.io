/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
import data.unit
open nat unit

set_option blast.strategy "cc"

constant r {A B : Type} : A → B → A

/- The unit type is a subsingleton. -/

example (a b c d : unit) : r a b = r c d :=
by blast

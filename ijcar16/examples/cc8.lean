/-
Example/test file for the congruence closure procedure described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The tactic `by blast` has been configured in this file to use just
the congruence closure procedure using the command

   set_option blast.strategy "cc"
-/
import data.finset data.set
open set finset
set_option blast.strategy "cc"

/-
Propositions are not the only subsingleton type that is useful in practice.
In the following example, we define the finite_set type class.
It is used to mark sets that are finite.
-/

structure finite_set [class] {T : Type} (xs : set T) :=
(to_finset : finset T) (is_equiv : to_set to_finset = xs)

/- The finite_set is a subsingleton -/
definition finset_set.is_subsingleton [instance] (T : Type) (xs : set T) : subsingleton (finite_set xs) :=
begin
  constructor, intro a b,
  induction a with f₁ h₁,
  induction b with f₂ h₂,
  subst xs,
  note e := to_set.inj h₂,
  subst e
end

/- Asumme some basic instances for the finite_set type class -/
variable {A : Type}
axiom finite_set_empty  : ∀ (A : Type), finite_set (∅:set A)
axiom finite_set_union  : ∀ (A : Type) (xs : set A) [finite_set xs] (ys : set A) [finite_set ys], finite_set (xs ∪ ys)
axiom finite_set_inter1 : ∀ (A : Type) (xs : set A) [finite_set xs] (ys : set A) [decidable_pred ys], finite_set (xs ∩ ys)
axiom finite_set_inter2 : ∀ (A : Type) (xs : set A) [finite_set xs] (ys : set A) [decidable_pred ys], finite_set (ys ∩ xs)

attribute [instance] finite_set_empty finite_set_union finite_set_inter1 finite_set_inter2

/- Define cardinality using finite_set type class -/
noncomputable definition mycard {T : Type} (xs : set T) [finite_set xs] :=
finset.card (to_finset xs)

/-
Note that in the following example, mycard contains implicit arguments of type finite_set,
and our congruence closure procedure handles them automatically.
-/
example (A : Type) (s₁ s₂ s₃ s₄ s₅ s₆ : set A)
        [finite_set s₁] [finite_set s₂]
        [finite_set s₃] [finite_set s₄]
        [decidable_pred s₅] [decidable_pred s₆] :
        s₁ = s₂ → s₃ = s₄ → s₆ = s₅ → mycard ((s₁ ∪ s₃) ∩ s₅) = mycard ((s₂ ∪ s₄) ∩ s₆) :=
by blast

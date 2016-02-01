/-
Firt example in the `Applications` section from the following paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The lemmas proved using `by inst_simp` are using the congruence closure
procedure described in the paper above.

The lemmas proved using `by rec_inst_simp` are also using the congruence closure
procedure described in the paper above. They first apply induction, and then use
`inst_simp`.

The tactic inst_simp uses E-matching to heuristically instantiate
lemmas tagged as simplification rules (i.e., `[simp]` tag in Lean).
-/
import data.nat
open nat

/-
Define notation `⟨ a ⟩` as shorthand for `cast (by inst_simp) a`.
That is, we use the tactic `inst_simp` to discharge the proof that
the type of `a` must be equal to the expected type.
-/
notation `⟨`:max a `⟩`:0 := cast (by inst_simp) a

inductive vector (A : Type) : nat → Type :=
| nil {} : vector A zero
| cons   : Π {n}, A → vector A n → vector A (succ n)

namespace vector

/- Define the notation  `a::b` and `[a_1, ..., a_n]` for vectors -/
notation a :: b := cons a b
notation `[` l:(foldr `, ` (h t, cons h t) nil `]`) := l

/-
Mark the following lemmas as `[simp]`. We do that to make sure
they are instantiated by the tactic `inst_simp`.
-/
lemma succ_add_one [simp] (n : ℕ) : succ n = n + 1 :=
rfl
attribute add_succ [simp]
attribute succ_add [simp]

variable {A : Type}

/-
We need to use casting while defining the `app` function because
1) `vector A (0+n)` and `vector A n` are not definitionally equal
2) `vector A (succ n + m)` and `vector A (succ (n + m))` are not definitionally equal.
In both cases, the types are provably equal, and we build a proof for these
equalities using the tactic `inst_simp`.
-/
definition app : Π {n m : nat}, vector A n → vector A m → vector A (n + m)
| 0        m []         w := ⟨ w ⟩
| (succ n) m (cons a v) w := ⟨ cons a (app v w) ⟩

theorem app_nil_left [simp] {n : nat} (v : vector A n) : app [] v == v :=
by unfold app; inst_simp

theorem app_cons [simp] {n m : nat} (h : A) (t : vector A n) (v : vector A m) : app (cons h t) v == cons h (app t v) :=
-- unfold the first occurrence of `app` and apply congruence closure
by unfold app at {1}; inst_simp

theorem app_nil_right [simp] {n : nat} (v : vector A n) : app v [] == v :=
by rec_inst_simp

definition app_assoc [simp] {n₁ n₂ n₃ : nat} (v₁ : vector A n₁) (v₂ : vector A n₂) (v₃ : vector A n₃) :
                     app v₁ (app v₂ v₃) == app (app v₁ v₂) v₃ :=
by rec_inst_simp

definition rev : Π {n : nat}, vector A n → vector A n
| 0     []          := []
| (n+1) (cons x xs) := app (rev xs) [x]

theorem rev_nil [simp] : rev [] = @nil A :=
rfl

theorem rev_cons [simp] {n : nat} (a : A) (v : vector A n) : rev (cons a v) = app (rev v) [a] :=
rfl

theorem rev_app [simp] : ∀ {n₁ n₂ : nat} (v₁ : vector A n₁) (v₂ : vector A n₂),
  rev (app v₁ v₂) == app (rev v₂) (rev v₁) :=
by rec_inst_simp

end vector

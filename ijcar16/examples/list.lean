/-
This is a file from the Lean standard library.
We use it to demonstrate/test the congruence closure procedure
described in the paper:
  "Congruence Closure for Intensional Type Theory"
   Daniel Selsam and Leonardo de Moura

The lemmas proved using `by inst_simp` are using the congruence closure
procedure described in the paper above.

The lemmas proved using `by rec_inst_simp` are also using the congruence closure
procedure described in the paper above. They first apply induction, and then use
`inst_simp`.

The tactic inst_simp uses E-matching to heuristically instantiate
lemmas tagged as simplification rules (i.e., `[simp]` tag in Lean).

There are 15 instances `by inst_simp` and `by rec_inst_simp` in this file.
-/
import data.nat
open nat

inductive list (T : Type) : Type :=
| nil {} : list T
| cons   : T → list T → list T

namespace list
notation h :: t  := cons h t
notation `[` l:(foldr `, ` (h t, cons h t) nil `]`) := l

variable {T : Type}

lemma cons_ne_nil [simp] (a : T) (l : list T) : a::l ≠ [] :=
by contradiction

lemma head_eq_of_cons_eq {A : Type} {h₁ h₂ : A} {t₁ t₂ : list A} :
      (h₁::t₁) = (h₂::t₂) → h₁ = h₂ :=
by inst_simp

lemma tail_eq_of_cons_eq {A : Type} {h₁ h₂ : A} {t₁ t₂ : list A} :
      (h₁::t₁) = (h₂::t₂) → t₁ = t₂ :=
by inst_simp

/- append -/

definition append : list T → list T → list T
| []       l := l
| (h :: s) t := h :: (append s t)

notation l₁ ++ l₂ := append l₁ l₂

theorem append_nil_left [simp] (t : list T) : [] ++ t = t :=
rfl

theorem append_cons [simp] (x : T) (s t : list T) : (x::s) ++ t = x::(s ++ t) :=
rfl

theorem append_nil_right [simp] : ∀ (t : list T), t ++ [] = t :=
by rec_inst_simp

theorem append.assoc [simp] : ∀ (s t u : list T), s ++ t ++ u = s ++ (t ++ u) :=
by rec_inst_simp

/- length -/
definition length : list T → nat
| []       := 0
| (a :: l) := length l + 1

theorem length_nil [simp] : length (@nil T) = 0 :=
rfl

theorem length_cons [simp] (x : T) (t : list T) : length (x::t) = length t + 1 :=
rfl

theorem length_append [simp] : ∀ (s t : list T), length (s ++ t) = length s + length t :=
by rec_inst_simp

theorem eq_nil_of_length_eq_zero : ∀ {l : list T}, length l = 0 → l = []
| []     H := rfl
| (a::s) H := by contradiction

theorem ne_nil_of_length_eq_succ : ∀ {l : list T} {n : nat}, length l = succ n → l ≠ []
| []     n h := by contradiction
| (a::l) n h := by contradiction

/- concat -/

definition concat : Π (x : T), list T → list T
| a []       := [a]
| a (b :: l) := b :: concat a l

theorem concat_nil [simp] (x : T) : concat x [] = [x] :=
rfl

theorem concat_cons [simp] (x y : T) (l : list T) : concat x (y::l)  = y::(concat x l) :=
rfl

theorem concat_eq_append [simp] (a : T) : ∀ (l : list T), concat a l = l ++ [a] :=
by rec_inst_simp

theorem concat_ne_nil [simp] (a : T) : ∀ (l : list T), concat a l ≠ [] :=
by intro l; induction l; repeat contradiction

theorem length_concat [simp] (a : T) : ∀ (l : list T), length (concat a l) = length l + 1 :=
by rec_inst_simp

theorem concat_append [simp] (a : T) : ∀ (l₁ l₂ : list T), concat a l₁ ++ l₂ = l₁ ++ a :: l₂ :=
by rec_inst_simp

theorem append_concat (a : T)  : ∀(l₁ l₂ : list T), l₁ ++ concat a l₂ = concat a (l₁ ++ l₂) :=
by rec_inst_simp

/- last -/

definition last : Π l : list T, l ≠ [] → T
| []          h := absurd rfl h
| [a]         h := a
| (a₁::a₂::l) h := last (a₂::l) !cons_ne_nil

lemma last_singleton [simp] (a : T) (h : [a] ≠ []) : last [a] h = a :=
rfl

lemma last_cons_cons [simp] (a₁ a₂ : T) (l : list T) (h : a₁::a₂::l ≠ []) : last (a₁::a₂::l) h = last (a₂::l) !cons_ne_nil :=
rfl

theorem last_congr {l₁ l₂ : list T} (h₁ : l₁ ≠ []) (h₂ : l₂ ≠ []) (h₃ : l₁ = l₂) : last l₁ h₁ = last l₂ h₂ :=
by subst l₁

theorem last_concat [simp] {x : T} : ∀ {l : list T} (h : concat x l ≠ []), last (concat x l) h = x :=
by rec_simp

-- add_rewrite append_nil append_cons

/- reverse -/

definition reverse : list T → list T
| []       := []
| (a :: l) := concat a (reverse l)

theorem reverse_nil [simp] : reverse (@nil T) = [] :=
rfl

theorem reverse_cons [simp] (x : T) (l : list T) : reverse (x::l) = concat x (reverse l) :=
rfl

theorem reverse_singleton [simp] (x : T) : reverse [x] = [x] :=
rfl

theorem reverse_append [simp] : ∀ (s t : list T), reverse (s ++ t) = (reverse t) ++ (reverse s) :=
by rec_inst_simp

theorem reverse_reverse [simp] : ∀ (l : list T), reverse (reverse l) = l :=
by rec_inst_simp

theorem concat_eq_reverse_cons (x : T) (l : list T) : concat x l = reverse (x :: reverse l) :=
by inst_simp

theorem length_reverse : ∀ (l : list T), length (reverse l) = length l :=
by rec_inst_simp

/- head and tail -/

definition head [h : inhabited T] : list T → T
| []       := arbitrary T
| (a :: l) := a

theorem head_cons [simp] [h : inhabited T] (a : T) (l : list T) : head (a::l) = a :=
rfl

theorem head_append [simp] [h : inhabited T] (t : list T) : ∀ {s : list T}, s ≠ [] → head (s ++ t) = head s :=
by rec_inst_simp

definition tail : list T → list T
| []       := []
| (a :: l) := l

theorem tail_nil [simp] : tail (@nil T) = [] :=
rfl

theorem tail_cons [simp] (a : T) (l : list T) : tail (a::l) = l :=
rfl

theorem cons_head_tail [h : inhabited T] {l : list T} : l ≠ [] → (head l)::(tail l) = l :=
by rec_inst_simp

end list

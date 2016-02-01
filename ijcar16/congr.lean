namespace paper

/-
In Lean {x : A} is used to declare implicit parameters that must be inferred
by solving typing constraints.

In Lean, the introduction rule and elimination rule for eq are called `eq.refl`
and `eq.rec` respectively.

So, we define refl and erec using them to match the notation used in the paper.
-/
definition refl {A : Type} (a : A) : a = a :=
eq.refl a

/- Remark: in eq.rec, the motive C is also an implicit argument -/
definition erec {A : Type} {a : A} (C : A → Type) (h₁ : C a) {b : A} (h₂ : a = b) : C b :=
eq.rec h₁ h₂

definition cast {A B : Type} (e : A = B) (a : A) : B :=
erec (λ x, x) a e

local infixr ` ▸ ` := cast

/- eq is symmetric -/
lemma symm {A : Type} {a b : A} : a = b → b = a :=
λ e, erec (λ x, x = a) (refl a) e

/- eq is transitivte -/
lemma trans {A : Type} {a b c : A} : a = b → b = c → a = c :=
λ e₁ e₂, erec (λ x, a = x) e₁ e₂

/- Simple congruence lemma for non-dependent functions. -/
lemma congr {A B : Type} {f g : A → B} {a b : A} : f = g → a = b → f a = g b :=
λ e₁ e₂,
  let p : f a = g a := erec (λ x, f a = x a) (refl (f a)) e₁ in
  erec (λ x, f a = g x) p e₂

/-
There are many ways to define heterogeneous equality.
In the following one, given (a : A) (b : B), we say `a == b` iff
there is a proof (e : A = B) that can be used to cast `a` into B.
-/
definition heq {A B : Type} (a : A) (b : B) :=
∃ e : A = B, e ▸ a = b

local infix ` == `:50 := heq

/- heq is reflexive -/
lemma hrefl {A : Type} (a : A) : a == a :=
Exists.intro (refl A) (refl a)

lemma flip {A B : Type} {e : A = B} : ∀ {a : A} {b : B}, e ▸ a = b → a = (symm e) ▸ b :=
eq.drec_on e (λ (a b : A) h, h)

lemma merge {A B C : Type} {e₁ : A = B} :
            ∀ {e₂ : B = C} {a : A} {b : B} {c : C}, e₁ ▸ a = b → e₂ ▸ b = c → (trans e₁ e₂) ▸ a = c :=
eq.drec_on e₁ (λ e₂, eq.drec_on e₂ (λ a b c e₃ e₄, trans e₃ e₄))

/- heq is symmetric -/
lemma hsymm {A B : Type} {a : A} {b : B} : a == b → b == a :=
begin
  intro e, induction e with [e₁, e₂],
  constructor, exact symm (flip e₂)
end

/- heq is transitivte -/
lemma htrans {A B C : Type} {a : A} {b : B} {c : C} : a == b → b == c → a == c :=
begin
  intro e₁ e₂,
  induction e₁ with [e₁₁, e₁₂],
  induction e₂ with [e₂₁, e₂₂],
  constructor, exact merge e₁₂ e₂₂
end

lemma ofeq {A : Type} {a b : A} : a = b → a == b :=
λ e, erec (λ x, a == x) (hrefl a) e

/- For the reverse direction, we need to use UIP or proof irrelevance -/
lemma ofheq {A : Type} {a b : A} : a == b → a = b :=
begin
  intro e,
  induction e with [e₁, e₂],
  -- e₁ : A = A,
  -- e₂ : e₁ ▸ a = b
  -- |- a = b
  have aux : e₁ = (refl A), from proof_irrel e₁ (refl A),
  rewrite aux at e₂,
  -- e₁ : A = A,
  -- e₂ : (refl A) ▸ a = b
  -- |- a = b

  -- Now ((refl A) ▸ a = b) is definitionally equal to (a = b)
  -- even in systems that do not have K-axiom in the kernel.
  exact e₂
end

/-
We can prove any instance of hcongr_n using the following
tactic script

  begin
    intro _ _ e, induction (ofheq e),
    repeat (intro _ _ e; induction (ofheq e)),
    apply hrefl
  end

Now, we apply it to a few instances of hcongr_n
-/

lemma hcongr₁ {A₁     : Type}
              {A₂     : A₁ → Type} :
              Π {f f'   : Π a₁, A₂ a₁}, f == f' →
              Π {a₁ a₁' : A₁}, a₁ == a₁' →
              f a₁ == f' a₁' :=
begin
  intro _ _ e, induction (ofheq e),
  repeat (intro _ _ e; induction (ofheq e)),
  apply hrefl
end

lemma hcongr₂ {A₁     : Type}
              {A₂     : A₁ → Type}
              {A₃     : Π a₁, A₂ a₁ → Type} :
              Π {f f'   : Π a₁ a₂, A₃ a₁ a₂}, f = f' →
              Π {a₁ a₁' : A₁}, a₁ == a₁' →
              Π {a₂ : A₂ a₁} {a₂' : A₂ a₁'}, a₂ == a₂' →
              f a₁ a₂ == f' a₁' a₂' :=
begin
  intro _ _ e, induction e,
  repeat (intro _ _ e; induction (ofheq e)),
  apply hrefl
end

lemma hcongr₃ {A₁     : Type}
              {A₂     : A₁ → Type}
              {A₃     : Π a₁, A₂ a₁ → Type}
              {A₄     : Π a₁ a₂, A₃ a₁ a₂ → Type} :
              Π {f f'   : Π a₁ a₂ a₃, A₄ a₁ a₂ a₃}, f = f' →
              Π {a₁ a₁' : A₁}, a₁ == a₁' →
              Π {a₂ : A₂ a₁} {a₂' : A₂ a₁'}, a₂ == a₂' →
              Π {a₃ : A₃ a₁ a₂} {a₃' : A₃ a₁' a₂'}, a₃ == a₃' →
              f a₁ a₂ a₃ == f' a₁' a₂' a₃' :=
begin
  intro _ _ e, induction e,
  repeat (intro _ _ e; induction (ofheq e)),
  apply hrefl
end

lemma hcongr₄ {A₁     : Type}
              {A₂     : A₁ → Type}
              {A₃     : Π a₁, A₂ a₁ → Type}
              {A₄     : Π a₁ a₂, A₃ a₁ a₂ → Type}
              {A₅     : Π a₁ a₂ a₃, A₄ a₁ a₂ a₃ → Type} :
              Π {f f'   : Π a₁ a₂ a₃ a₄, A₅ a₁ a₂ a₃ a₄}, f = f' →
              Π {a₁ a₁' : A₁}, a₁ == a₁' →
              Π {a₂ : A₂ a₁} {a₂' : A₂ a₁'}, a₂ == a₂' →
              Π {a₃ : A₃ a₁ a₂} {a₃' : A₃ a₁' a₂'}, a₃ == a₃' →
              Π {a₄ : A₄ a₁ a₂ a₃} {a₄' : A₄ a₁' a₂' a₃'}, a₄ == a₄' →
              f a₁ a₂ a₃ a₄ == f' a₁' a₂' a₃' a₄' :=
begin
  intro _ _ e, induction e,
  repeat (intro _ _ e; induction (ofheq e)),
  apply hrefl
end

lemma hcongr₅ {A₁     : Type}
              {A₂     : A₁ → Type}
              {A₃     : Π a₁, A₂ a₁ → Type}
              {A₄     : Π a₁ a₂, A₃ a₁ a₂ → Type}
              {A₅     : Π a₁ a₂ a₃, A₄ a₁ a₂ a₃ → Type}
              {A₆     : Π a₁ a₂ a₃ a₄, A₅ a₁ a₂ a₃ a₄ → Type} :
              Π {f f'   : Π a₁ a₂ a₃ a₄ a₅, A₆ a₁ a₂ a₃ a₄ a₅}, f = f' →
              Π {a₁ a₁' : A₁}, a₁ == a₁' →
              Π {a₂ : A₂ a₁} {a₂' : A₂ a₁'}, a₂ == a₂' →
              Π {a₃ : A₃ a₁ a₂} {a₃' : A₃ a₁' a₂'}, a₃ == a₃' →
              Π {a₄ : A₄ a₁ a₂ a₃} {a₄' : A₄ a₁' a₂' a₃'}, a₄ == a₄' →
              Π {a₅ : A₅ a₁ a₂ a₃ a₄} {a₅' : A₅ a₁' a₂' a₃' a₄'}, a₅ == a₅' →
              f a₁ a₂ a₃ a₄ a₅ == f' a₁' a₂' a₃' a₄' a₅' :=
begin
  intro _ _ e, induction e,
  repeat (intro _ _ e; induction (ofheq e)),
  apply hrefl
end

/-
In Coq, heterogeneous equality is called JMeq,
and is defined as the following inductive datatype.
-/
inductive JMeq {A : Type} (a : A) : ∀ {B : Type}, B → Prop :=
refl : JMeq a a

/- JMeq and heq are equivalent. -/
lemma heq_of_JMeq {A B : Type} {a : A} {b : B} : JMeq a b → a == b :=
assume e, JMeq.rec (hrefl a) e

lemma JMeq_of_heq {A B : Type} {a : A} {b : B} : a == b → JMeq a b :=
begin
  intro e, induction e with [e₁, e₂],
  subst e₁, subst e₂,
  apply JMeq.refl
end

end paper

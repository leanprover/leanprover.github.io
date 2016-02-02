import data.real
open real

namespace example2

/- Assume we have an exp (exponential) function, and state basic properties using axioms. -/
constant exp : ℝ → ℝ
/- The annotation (: t :) is used to indicate that `t` is a pattern for the E-matching procedure. -/
axiom exp_add : ∀ x y : ℝ, (: exp (x + y) :) = exp x * exp y
/- The [forward] attribute instructs lean to use the following axioms for E-matching. -/
attribute [forward] exp_add

/- Define t² as notation for t*t -/
notation a `²` := a * a
/- (sq x) and (x * x) are equal by definition, and we can prove it using reflexivity. -/
lemma sq_add [forward] : ∀ x y : ℝ, (x + y)² = (: x² + 2 * x * y + y² :) :=
  take x y, by rewrite add_mul_self_eq

/- Define predicate pos and state basic properties using axioms. -/
definition pos (x : ℝ) := x > 0
axiom pos_1    : pos (1:ℝ)
axiom pos_bit1 : ∀ x : ℝ,   pos x → pos (bit1 x)
axiom pos_bit0 : ∀ x : ℝ,   pos x → pos (bit0 x)
axiom pos_add  : ∀ x y : ℝ, pos x → pos y → (: pos (x + y) :)
axiom pos_mul  : ∀ x y : ℝ, pos x → pos y → (: pos (x * y) :)
axiom pos_exp  : ∀ x : ℝ,   pos (exp x)

/- The [intro!] attribute instructs lean to use the following axioms for backward chaining. -/
attribute [intro!]  pos_bit1 pos_bit0 pos_1 pos_add pos_mul pos_exp
attribute [forward] pos_add pos_mul

/- Define predicate nzero and state basic properties using axioms. -/
definition nzero (x : ℝ) := x ≠ 0
axiom nzero_of_pos : ∀ x : ℝ, pos x → nzero x
axiom nzero_of_neg : ∀ x : ℝ, pos x → nzero (- x)

attribute [intro!] nzero_of_pos nzero_of_neg

/- Assume we have safe_log and safe_inv functions. -/
constant safe_log : Π (x : ℝ), pos x → ℝ
constant safe_inv : Π (x : ℝ), nzero x → ℝ

/-
Define notation (log x), (x ⁻¹) and (x / y) for safe_log and safe_inv.
We discharge the preconditions pos and nzero using tactics.
The grind tactic is based on backward chaining, and uses all axioms/lemmas
marked with the `[intro!]` attribute.
-/
notation `log`:max x:max := (@safe_log x (by grind))
/-
  We use priority greater than the default to avoid a conflict with existing
  notation defined in Lean.
-/
notation [priority std.priority.default+1] x ⁻¹ := (@safe_inv x (by grind))
notation [priority std.priority.default+1] x `/` y := (@safe_inv y (by grind) * x)

/- Assume basic properties about safe_inf and safe_log as axioms -/

axiom inv_pos         : ∀ x : ℝ,   pos x → pos (x⁻¹)
axiom inv_mul         : ∀ x y : ℝ, pos x → pos y →  (x * y)⁻¹ = (x⁻¹) * (y⁻¹)
axiom inv_cancel_left : ∀ x y : ℝ, pos x →  x⁻¹ * (x * y) = y
axiom inv_neg         : ∀ x : ℝ,   pos x →  (- x)⁻¹ = - (x⁻¹)

attribute [intro!] inv_pos
attribute [forward] inv_pos inv_mul inv_cancel_left inv_neg

axiom log_mul : ∀ x y : ℝ, pos x → pos y → log (x * y) = log x + log y
axiom log_inv : ∀ x : ℝ,   pos x → log (x⁻¹)  = - log x

attribute [forward] log_mul log_inv

/- To prove the main lemma, we also need the following basic properties from the standard library. -/
lemma rdistrib [forward]    : ∀ x y z : ℝ, (x + y) * z = x * z + y * z   :=
  right_distrib
lemma addcomm [forward]     : ∀ x y : ℝ, x + y = y + x                   :=
  add.comm
lemma sub_def [forward]     : ∀ x y : ℝ, x - y = x + -y                  :=
  take x y, rfl
lemma mul_two_sum [forward] : ∀ x : ℝ, 2 * x = x + x                     :=
  take x, show (1 + 1) * x = x + x,
  by rewrite [rdistrib, one_mul]
lemma neg_mul [forward]     : ∀ x y : ℝ, (: (- x) * y :) = - (x * y)     :=
  take x y, by rewrite neg_mul_eq_neg_mul

set_option blast.strategy "ematch"
set_option blast.ematch.max_instances 2000

example : ∀ x y z w : ℝ, pos x → pos y → pos z → pos w → x * y = exp z + w →
          log (2 * w * exp z + w² + exp (2*z)) / -2 = log (y⁻¹) - log x :=
begin
  have pos 2, by grind, /- Discharge auxiliary fact using backward chaining. -/
  blast                 /- Use congruence closure and ematching to prove main goal. -/
end

end example2

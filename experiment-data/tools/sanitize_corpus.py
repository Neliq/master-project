#!/usr/bin/env python3
"""Sanitizer pass 1: curated notation map (reconstructed; derived from the
ontology's formal symbols). Applies word-boundary replacements so the blind
corpus carries no thesis formalism. Reports residual classes."""
import pathlib
import os
import re

EXP = pathlib.Path(os.environ.get("EXPERIMENT_DIR", pathlib.Path(__file__).resolve().parents[1]))
CORPUS = pathlib.Path(os.environ.get("CORPUS_DIR", EXP / "corpus"))

MAP = {
    # states
    "S_trial": "trial", "S_premium": "premium", "S_cancel": "cancellation",
    "S_account": "account", "S_checkout": "checkout", "S_final": "the final step",
    "S_pending": "pending", "S_0": "the start", "S_1": "the next step",
    # payment / time
    "T_payment": "payment", "t_expiry": "the expiry date", "t_0": "the start",
    "t_1": "the end", "t_2": "the moment of decision",
    # events
    "E_charge": "the charge", "E_purchase": "the purchase", "E_append": "new content",
    "E_refresh": "the refresh", "E_upsell": "the upsell", "E_open": "the open action",
    "E_pay": "the payment", "E_signup": "the signup",
    # venues
    "V_exchange": "the coin store", "V_checkout": "the fiat checkout",
    "V_product": "the product page", "V_purchase": "the purchase page",
    "V_cart": "the cart", "V_payment": "the payment page",
    # choices / paths
    "C_dismiss": "dismissal options", "C_accept": "accept options",
    "C_close": "close options", "C_deny": "denial options",
    "D_deny": "the denial option", "D_accept": "the accept option",
    "D_opt_out": "the opt-out", "D_decline": "the decline option",
    "D_exit": "the exit", "D_confirm": "the confirm option",
    # counts
    "N_del": "deletion steps", "N_neg": "negations", "N_links": "links",
    "N_opt": "options", "N_create": "creation steps", "N_steps": "steps",
    "N_clicks": "clicks", "N_items": "items", "N_choices": "choices",
    "K_del": "deletion steps", "K_click": "clicks",
    # messages / display
    "M_upsell": "the upsell", "M_displayed": "the displayed message",
    "M_system_prompt": "the prompt",
    "P_visual": "the displayed progress", "P_actual": "the actual progress",
    "P_manage": "the manage option", "P_accept": "the accept option",
    # lexicon
    "L_FOMO": "urgency words", "L_urgency": "urgency words",
    "L_neg": "negative words", "L_pos": "positive words",
    # thresholds (τ)
    "τ_fomo": "the threshold", "τ_commit": "the threshold",
    "τ_mislead": "the threshold", "τ_load": "the threshold",
    "τ_max": "the threshold", "τ_template": "the threshold",
    "τ_specificity": "the threshold", "τ_clarity": "the threshold",
    "τ_pulsation": "the threshold", "τ_feedforward": "the threshold",
    "τ_wcag_min": "the minimum", "τ_wcag_hitbox": "the minimum",
    "τ_cognitive_load": "the threshold", "τ_camouflage": "the threshold",
    "τ_social": "the threshold", "τ_pain": "the threshold",
    "τ_occlusion": "the threshold", "τ_appointment": "the threshold",
    "τ_appointment_urgency": "the threshold", "τ_panic_duration": "the threshold",
    "τ_arousal": "the threshold", "τ_suppress": "the threshold",
    "τ_depth": "the threshold", "τ_privacy_skew": "the threshold",
    "τ_fatigue": "the threshold", "τ_ref_cr": "the threshold",
    "τ_escalation": "the threshold", "τ_guest_visibility": "the threshold",
    "τ_min_readable": "the readable minimum", "τ_deliberation": "the threshold",
    "τ_peripheral_vision": "the threshold", "τ_words": "the threshold",
    "τ_min": "the threshold",
    # deltas
    "Δt": "the delay", "Δt_min": "the delay", "Δt_refresh": "the delay",
    "Δt_warning": "the warning window", "Δt_countdown": "the countdown",
    "Δt_offer": "the offer window", "Δt_animation": "the animation",
    "Δt_network": "the network time", "Δ_pct": "the discount",
    "ΔStock_actual": "the stock change", "ΔI₃": "the tier increase",
    "ΔI₂": "the tier increase", "ΔY": "the pull", "Δ_color": "the colour gap",
    "ΔY_touch": "the pull", "Δ_t": "the delay", "Δ": "the change",
    "δ": "the difference", "δ_salience": "the difference", "δ_contrast": "the contrast gap",
    "λ_interrupt": "the interrupt rate", "λ_friction": "the friction",
    "λ": "the rate",
    # operators / math
    "∧": " and ", "∨": " or ", "¬": "not ", "∉": "not in ", "⊆": "within ",
    "⊂": "within ", "∈": "in ", "∅": "none", "≥": "at least ", "≤": "at most ",
    "≠": "differs from ", "≈": "about ", "⇒": "so ", "∝": "scales with ",
    "∃": "there exists ", "∀": "for all ", "∑": "the sum of ",
    "≫": "far above ", "≪": "far below ", "«": "", "»": "", "×": "x",
}

def apply_map(s):
    for tok, rep in MAP.items():
        s = s.replace(tok, rep)
    return s

files = sorted(CORPUS.glob("*.html"))
changed = 0
for f in files:
    s = f.read_text()
    s2 = apply_map(s)
    if s2 != s:
        f.write_text(s2)
        changed += 1

print(f"sanitized {changed}/{len(files)} files")
# residual class report
def count(rx):
    n = 0
    for f in files:
        n += len(re.findall(rx, f.read_text()))
    return n
nota = r"\b[A-Z]_[A-Za-z]"
gree = r"[τΔλδ]"
print(f"Variant A/B: {count(r'Variant [AB]')} files")
print(f"dark pattern: {count(r'(?i)dark pattern')} files")
print(f"S_/T_/E_/V_/C_/D_/N_/K_/M_/P_/L_ notation: {count(nota)} files")
print(f"greek tau/delta/lambda: {count(gree)} files")

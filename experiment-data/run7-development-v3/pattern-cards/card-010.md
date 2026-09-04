# Drip Pricing, Hidden Costs, or Partitioned Pricing [sneaking]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E2, E3, E6.

## 1. 1. Sequential Price Inflation
Mechanism summary: To track the inflation of cost across a transaction, we model the checkout flow as a sequence of user states$S = (s_0, s_1, \dots, s_n)$, where$s_0$represents the initial product page and$s_n$denotes the final payment confirmation page.

FORMULA: P(s_n) > P(s_0) + I_{\mathrm{added}} \quad \implies \quad P_{\mathrm{dripped}} > 0

## 2. 2. Visual Disparity of Cost Partitioning
Mechanism summary: Even when partitioned fees are technically disclosed on the same page, their impact is frequently minimized through visual suppression.

FORMULA: \frac{V(N_{\mathrm{base}})}{V(N_{\mathrm{fee}})} > \tau_{\mathrm{prominence}}

## 3. 3. Semantic Concealment of Mandatory Fee Disclosure
Mechanism summary: To establish a semantic baseline for Drip Pricing, the algorithm scans the checkout flow for mandatory-fee descriptors (“service fee,” “booking fee,” “convenience charge”) and evaluates whether these terms appear in the initial price presentation or only at the final confirmation step.

FORMULA: T_{\mathrm{initial}} \cap K_{\mathrm{fees}} = \emptyset \quad \land \quad T_{\mathrm{final}} \cap K_{\mathrm{fees}} \neq \emptyset


# Activity Messages [urgency]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E5, E6.

## 1. 1. Asynchronous Event Fabrication
Mechanism summary: To identify the manufacture of synthetic social proof, we define$E_{\mathrm{real}}(t)$as the set of genuine transactions in the database and$M_{\mathrm{displayed}}(t)$as the activity message rendered on the client interface.

FORMULA: M_{\mathrm{displayed}}(t) \neq \emptyset \quad \land \quad M_{\mathrm{displayed}}(t) \notin E_{\mathrm{real}}(t)

## 2. 2. Cognitive Interruption
Mechanism summary: The hostility of activity messages is often defined by their power to disrupt deliberative thinking.

FORMULA: \mathrm{Salience}(N_{\mathrm{activity}}) \to \mathrm{Max} \quad \land \quad \lambda_{\mathrm{interrupt}} > \tau_{\mathrm{cognitive\_load}} \implies S_{\mathrm{focus}} \to \mathrm{Disrupted}

## 3. 3. Semantic Specificity of Activity-Notification Content
Mechanism summary: To establish a semantic baseline for Activity Messages, the algorithm evaluates the semantic specificity of social-activity notifications.

FORMULA: \mathrm{Specificity}(T_{\mathrm{activity}}) < \tau_{\mathrm{specificity}} \quad \land \quad \neg\exists \text{IdentityRef} \in T_{\mathrm{activity}}


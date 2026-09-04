# Formalization revision v4

This revision preserves the original 62 patterns, 186 conditions, and every original formula. It adds an explicit aggregation contract that was missing from the ontology/application protocol.

## Condition evaluation

For condition `j` of pattern `p`:

```text
C[p,j] := Evaluate(FORMULA[p,j] AND every GIVEN[p,j])
```

All atomic requirements are evaluated with three-valued status: TRUE, FALSE, or UNKNOWN. A conjunction is TRUE only if all operands are TRUE; FALSE if any operand is FALSE; UNKNOWN otherwise. Material implications are not used as detectors: their relevant premise and consequence must be observed.

## Pattern evaluation

The three condition layers are alternative detectors:

```text
Pattern[p] := C[p,1] OR C[p,2] OR C[p,3]
```

The resulting pattern status is TRUE if any condition is TRUE, FALSE if all conditions are FALSE, and UNKNOWN otherwise. A condition with counterevidence polarity can disqualify its associated trigger but cannot create a positive pattern result.

## Evidence and routing

Complete the neutral multimodal evidence ledger first. Pattern routing is an efficiency aid only. A card is not applicable when its domain/context gate is contradicted. Missing evidence remains UNKNOWN.

## Scientific status

This is a development revision. The aggregation choice is frozen before its next evaluation and must not be changed after observing outcomes.

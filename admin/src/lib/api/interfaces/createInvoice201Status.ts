/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */

export type CreateInvoice201Status =
  (typeof CreateInvoice201Status)[keyof typeof CreateInvoice201Status];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateInvoice201Status = {
  DISPUTED: "DISPUTED",
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  OVERDUE: "OVERDUE",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  PAID: "PAID",
  FAILED: "FAILED",
} as const;

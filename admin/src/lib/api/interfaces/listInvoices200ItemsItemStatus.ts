/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */

export type ListInvoices200ItemsItemStatus =
  (typeof ListInvoices200ItemsItemStatus)[keyof typeof ListInvoices200ItemsItemStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListInvoices200ItemsItemStatus = {
  DISPUTED: "DISPUTED",
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  OVERDUE: "OVERDUE",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  PAID: "PAID",
  FAILED: "FAILED",
} as const;
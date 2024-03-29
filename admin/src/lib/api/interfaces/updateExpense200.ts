/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import type { UpdateExpense200Contact } from "./updateExpense200Contact";
import type { UpdateExpense200ItemsItem } from "./updateExpense200ItemsItem";
import type { UpdateExpense200Document } from "./updateExpense200Document";

export type UpdateExpense200 = {
  id: string;
  sub_total: string;
  tax_amount: string;
  total: string;
  due_date: string | null;
  currency: string;
  status: string;
  notes: string | null;
  terms: string | null;
  contact: UpdateExpense200Contact;
  items: UpdateExpense200ItemsItem[];
  document: UpdateExpense200Document;
};

/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import type { GetExpense200ContactBillingAddress } from "./getExpense200ContactBillingAddress";
import type { GetExpense200ContactShippingAddress } from "./getExpense200ContactShippingAddress";

export type GetExpense200Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vat: string;
  website: string | null;
  billing_address: GetExpense200ContactBillingAddress;
  shipping_address: GetExpense200ContactShippingAddress;
};

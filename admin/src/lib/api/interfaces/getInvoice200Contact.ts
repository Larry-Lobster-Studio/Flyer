/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import type { GetInvoice200ContactBillingAddress } from "./getInvoice200ContactBillingAddress";
import type { GetInvoice200ContactShippingAddress } from "./getInvoice200ContactShippingAddress";

export type GetInvoice200Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vat: string;
  website: string | null;
  billing_address: GetInvoice200ContactBillingAddress;
  shipping_address: GetInvoice200ContactShippingAddress;
};
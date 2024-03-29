/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import type { CreateInvoice201ContactBillingAddress } from "./createInvoice201ContactBillingAddress";
import type { CreateInvoice201ContactShippingAddress } from "./createInvoice201ContactShippingAddress";

export type CreateInvoice201Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vat: string;
  website: string | null;
  billing_address: CreateInvoice201ContactBillingAddress;
  shipping_address: CreateInvoice201ContactShippingAddress;
};

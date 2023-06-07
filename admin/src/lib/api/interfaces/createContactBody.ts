/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import type { CreateContactBodyBillingAddress } from "./createContactBodyBillingAddress";
import type { CreateContactBodyShippingAddress } from "./createContactBodyShippingAddress";

export type CreateContactBody = {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  vat: string;
  billing_address?: CreateContactBodyBillingAddress;
  shipping_address?: CreateContactBodyShippingAddress;
};

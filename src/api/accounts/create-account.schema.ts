import z from "zod";
import type { Account } from "./get-accounts.schema";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.string().optional(),
  currency: z.string().optional(),
  balance: z.number().min(0, "Balance must be non-negative").optional(),
});

export type CreateAccountPayload = z.infer<typeof createAccountSchema>;

export type CreateAccountResponse = {
  data: Account;
};

import z from "zod";
import { createAccountSchema } from "./create-account.schema";

export const updateAccountSchema = createAccountSchema.partial().extend({
  id: z.string(),
});

export type UpdateAccountPayload = z.infer<typeof updateAccountSchema>;

import z from "zod";

export const deleteAccountSchema = z.object({
  accountId: z.string(),
});

export type DeleteAccountPayload = z.infer<typeof deleteAccountSchema>;

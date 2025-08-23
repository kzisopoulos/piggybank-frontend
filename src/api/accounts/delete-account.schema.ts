import z from "zod";

export const deleteAccountSchema = z.object({
  id: z.string(),
});

export type DeleteAccountPayload = z.infer<typeof deleteAccountSchema>;

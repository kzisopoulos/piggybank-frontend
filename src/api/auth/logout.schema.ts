import z from "zod";

export const logoutResponseSchema = z.object({
  message: z.string(),
});

export type GetLogoutResponse = z.infer<typeof logoutResponseSchema>;

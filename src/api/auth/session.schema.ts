import { z } from "zod";

export const sessionResponseSchema = z.object({
  email: z.string(),
});

export type GetSessionResponse = z.infer<typeof sessionResponseSchema>;

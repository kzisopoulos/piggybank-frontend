import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const loginResponseSchema = z.object({
  email: z.string(),
});

export type LoginFormPayload = z.infer<typeof loginFormSchema>;

export type GetLoginResponse = z.infer<typeof loginResponseSchema>;

import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  username: z
    .string({ error: "Username is requred" })
    .min(2, { error: "Username must be at least 2 characters long" }),
  password: z
    .string({ error: "Password is required." })
    .min(5, { error: "Password must be at least 5 characters long." }),
});

export const registerResponseSchema = z.object({
  email: z.string(),
});

export type RegisterFormPayload = z.infer<typeof registerFormSchema>;

export type GetRegisterResponse = z.infer<typeof registerResponseSchema>;

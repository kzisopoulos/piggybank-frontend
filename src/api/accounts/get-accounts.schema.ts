import z from "zod";

export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().optional(),
  currency: z.string().optional(),
  balance: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Account = z.infer<typeof accountSchema>;

export type GetAccountsResponse = {
  data: Account[];
  pagination: any;
};

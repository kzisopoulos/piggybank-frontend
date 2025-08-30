import { z } from "zod";

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color code")
    .optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subcategories: z.array(z.any()),
  transactions: z.array(z.any()),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string(),
});

export const deleteCategorySchema = z.object({
  id: z.string(),
});

export const getCategoriesResponseSchema = z.array(categorySchema);

// Subcategory schemas
export const createSubcategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  categoryId: z.string().min(1, "Category ID is required"),
});

export const subcategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateSubcategorySchema = createSubcategorySchema
  .partial()
  .extend({
    id: z.string(),
  });

export const deleteSubcategorySchema = z.object({
  id: z.string(),
});

export const getSubcategoriesResponseSchema = z.array(subcategorySchema);

// TypeScript types
export type Category = z.infer<typeof categorySchema>;
export type Subcategory = z.infer<typeof subcategorySchema>;
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryPayload = z.infer<typeof deleteCategorySchema>;
export type CreateSubcategoryPayload = z.infer<typeof createSubcategorySchema>;
export type UpdateSubcategoryPayload = z.infer<typeof updateSubcategorySchema>;
export type DeleteSubcategoryPayload = z.infer<typeof deleteSubcategorySchema>;
export type GetCategoriesResponse = z.infer<typeof getCategoriesResponseSchema>;
export type GetSubcategoriesResponse = z.infer<
  typeof getSubcategoriesResponseSchema
>;

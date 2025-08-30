import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/categories";
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  GetCategoriesResponse,
} from "../types/category";

export const useCategories = () => {
  const queryClient = useQueryClient();

  // Get categories query
  const categoriesQuery = useQuery<GetCategoriesResponse, AxiosError>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Create category mutation
  const createCategoryMutation = useMutation<
    Category,
    AxiosError,
    CreateCategoryPayload
  >({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation<
    Category,
    AxiosError,
    UpdateCategoryPayload
  >({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation<void, AxiosError, { id: string }>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });

  return {
    categoriesQuery,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};

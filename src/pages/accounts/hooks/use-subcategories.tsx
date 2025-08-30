import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateSubcategoryPayload,
  GetSubcategoriesResponse,
  Subcategory,
  UpdateSubcategoryPayload,
} from "../types/category";
import type { AxiosError } from "axios";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  updateSubcategory,
} from "@/api/categories";

export const useSubcategories = () => {
  const queryClient = useQueryClient();

  // Get subcategories query
  const subcategoriesQuery = useQuery<GetSubcategoriesResponse, AxiosError>({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
  });

  // Create subcategory mutation
  const createSubcategoryMutation = useMutation<
    Subcategory,
    AxiosError,
    CreateSubcategoryPayload
  >({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update subcategory mutation
  const updateSubcategoryMutation = useMutation<
    Subcategory,
    AxiosError,
    UpdateSubcategoryPayload
  >({
    mutationFn: updateSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete subcategory mutation
  const deleteSubcategoryMutation = useMutation<
    void,
    AxiosError,
    { id: string }
  >({
    mutationFn: deleteSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    subcategoriesQuery,
    createSubcategoryMutation,
    updateSubcategoryMutation,
    deleteSubcategoryMutation,
  };
};

import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type {
  CreateCategoryPayload,
  Category,
} from "@/pages/accounts/types/category";

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<Category> => {
  const response = await axiosInstance.post(endpoints.categories, payload);
  return response.data;
};

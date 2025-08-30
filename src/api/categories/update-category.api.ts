import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type {
  UpdateCategoryPayload,
  Category,
} from "@/pages/accounts/types/category";

export const updateCategory = async (
  payload: UpdateCategoryPayload
): Promise<Category> => {
  const { id, ...data } = payload;
  const response = await axiosInstance.put(endpoints.categories, {
    id,
    ...data,
  });
  return response.data;
};

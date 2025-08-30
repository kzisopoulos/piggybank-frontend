import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type {
  CreateSubcategoryPayload,
  Subcategory,
} from "@/pages/accounts/types/category";

export const createSubcategory = async (
  payload: CreateSubcategoryPayload
): Promise<Subcategory> => {
  const response = await axiosInstance.post(endpoints.subcategories, payload);
  return response.data;
};

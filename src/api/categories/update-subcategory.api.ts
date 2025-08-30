import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type {
  UpdateSubcategoryPayload,
  Subcategory,
} from "@/pages/accounts/types/category";

export const updateSubcategory = async (
  payload: UpdateSubcategoryPayload
): Promise<Subcategory> => {
  const { id, ...data } = payload;
  const response = await axiosInstance.put(endpoints.subcategories, {
    id,
    ...data,
  });
  return response.data;
};

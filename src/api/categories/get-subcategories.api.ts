import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type { GetSubcategoriesResponse } from "@/pages/accounts/types/category";

export const getSubcategories = async (): Promise<GetSubcategoriesResponse> => {
  const response = await axiosInstance.get(endpoints.subcategories);
  return response.data;
};

import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type { GetCategoriesResponse } from "@/pages/accounts/types/category";

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const { data } = await axiosInstance.get(endpoints.categories);
  return data.data;
};

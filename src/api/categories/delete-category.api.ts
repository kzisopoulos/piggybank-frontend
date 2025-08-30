import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type { DeleteCategoryPayload } from "@/pages/accounts/types/category";

export const deleteCategory = async (
  payload: DeleteCategoryPayload
): Promise<void> => {
  await axiosInstance.delete(endpoints.categories, {
    data: { id: payload.id },
  });
};

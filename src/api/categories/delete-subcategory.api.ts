import { axiosInstance } from "@/api/axios/axios";
import { endpoints } from "@/api/client";
import type { DeleteSubcategoryPayload } from "@/pages/accounts/types/category";

export const deleteSubcategory = async (
  payload: DeleteSubcategoryPayload
): Promise<void> => {
  await axiosInstance.delete(endpoints.subcategories, {
    data: { id: payload.id },
  });
};

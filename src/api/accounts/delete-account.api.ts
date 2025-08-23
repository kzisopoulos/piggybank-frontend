import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { DeleteAccountPayload } from "./delete-account.schema";

export const deleteAccount = (body: DeleteAccountPayload) => {
  return axiosInstance
    .delete(endpoints.accounts, { data: body })
    .then(({ data }) => data);
};

import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { UpdateAccountPayload } from "./update-account.schema";

export const updateAccount = (body: UpdateAccountPayload) => {
  return axiosInstance
    .patch(endpoints.accounts, { ...body })
    .then(({ data }) => data);
};

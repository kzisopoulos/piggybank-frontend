import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { GetAccountsResponse } from "./get-accounts.schema";

export const getAccounts = () => {
  return axiosInstance
    .get<GetAccountsResponse>(endpoints.accounts)
    .then(({ data }) => data);
};

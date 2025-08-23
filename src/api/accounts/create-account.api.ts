import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type {
  CreateAccountPayload,
  CreateAccountResponse,
} from "./create-account.schema";

export const createAccount = (body: CreateAccountPayload) => {
  return axiosInstance
    .post<CreateAccountResponse>(endpoints.accounts, { ...body })
    .then(({ data }) => data);
};

import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type {
  RegisterFormPayload,
  GetRegisterResponse,
} from "./register.schema";

export const register = (body: RegisterFormPayload) => {
  return axiosInstance
    .post<GetRegisterResponse>(endpoints.register, { ...body })
    .then(({ data }) => data);
};

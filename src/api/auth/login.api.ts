import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { LoginFormPayload, GetLoginResponse } from "./login.schema";

export const login = (body: LoginFormPayload) => {
  return axiosInstance
    .post<GetLoginResponse>(endpoints.login, { ...body })
    .then(({ data }) => data);
};

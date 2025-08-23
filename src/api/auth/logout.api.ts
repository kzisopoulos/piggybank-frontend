import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { GetLogoutResponse } from "./logout.schema";

export const logout = () => {
  return axiosInstance
    .post<GetLogoutResponse>(endpoints.logout)
    .then(({ data }) => data);
};

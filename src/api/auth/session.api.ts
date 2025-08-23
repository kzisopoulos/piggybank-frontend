import { axiosInstance } from "../axios/axios";
import { endpoints } from "../client";
import type { GetSessionResponse } from "./session.schema";

export const getSession = () => {
  return axiosInstance
    .get<GetSessionResponse>(endpoints.session)
    .then(({ data }) => data);
};

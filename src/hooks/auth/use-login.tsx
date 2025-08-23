import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import {
  login,
  type LoginFormPayload,
  type GetLoginResponse,
} from "@/api/auth";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const { setAuthStatus } = useAuth();

  const mutation = useMutation<GetLoginResponse, AxiosError, LoginFormPayload>({
    mutationKey: ["login"],
    mutationFn: (body) => login(body),
    onSuccess: () => {
      setAuthStatus(true);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    ...mutation,
  };
};

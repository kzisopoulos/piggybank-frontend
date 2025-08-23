import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import {
  register,
  type RegisterFormPayload,
  type GetRegisterResponse,
} from "@/api/auth";
import type { AxiosError } from "axios";

export const useRegister = () => {
  const { setAuthStatus } = useAuth();

  const mutation = useMutation<
    GetRegisterResponse,
    AxiosError,
    RegisterFormPayload
  >({
    mutationKey: ["register"],
    mutationFn: (body) => register(body),
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

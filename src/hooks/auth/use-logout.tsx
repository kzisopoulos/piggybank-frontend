import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { type GetLogoutResponse, logout } from "@/api/auth";
import type { AxiosError } from "axios";

export const useLogout = () => {
  const { setAuthStatus } = useAuth();

  const mutation = useMutation<GetLogoutResponse, AxiosError>({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      setAuthStatus(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    ...mutation,
  };
};

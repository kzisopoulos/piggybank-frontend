import { createAccount } from "@/api/accounts/create-account.api";
import type {
  CreateAccountPayload,
  CreateAccountResponse,
} from "@/api/accounts/create-account.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateAccountResponse,
    AxiosError,
    CreateAccountPayload
  >({
    mutationKey: ["create-account"],
    mutationFn: (body) => createAccount(body),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get-accounts"],
      });
    },
  });

  return {
    ...mutation,
  };
};

import { deleteAccount } from "@/api/accounts";
import type { DeleteAccountPayload } from "@/api/accounts/delete-account.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, AxiosError, DeleteAccountPayload>({
    mutationKey: ["delete-account"],
    mutationFn: (body) => deleteAccount(body),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get-accounts"],
      });
    },
  });

  return { ...mutation };
};

import { updateAccount, type UpdateAccountPayload } from "@/api/accounts";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, AxiosError, UpdateAccountPayload>({
    mutationKey: ["update-account"],
    mutationFn: (body) => updateAccount(body),
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

import { getAccounts, type GetAccountsResponse } from "@/api/accounts";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetAccounts = () => {
  const query = useQuery<GetAccountsResponse, AxiosError>({
    queryKey: ["get-accounts"],
    queryFn: () => getAccounts(),
  });

  return {
    ...query,
  };
};

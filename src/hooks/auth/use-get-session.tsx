import { getSession } from "@/api/auth";
import type { GetSessionResponse } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetSession = () => {
  const query = useQuery<GetSessionResponse, AxiosError>({
    queryKey: ["get-session"],
    queryFn: () => getSession(),
  });

  return {
    ...query,
  };
};

import { useGetSession } from "@/hooks/auth/use-get-session";
import { QueryClient } from "@tanstack/react-query";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type AuthState = {
  authenticated: boolean;
  loading: boolean;
  setAuthStatus: (value: boolean) => void;
  authIsReady: boolean;
  email: string;
};

const initialState: AuthState = {
  authenticated: false,
  loading: true,
  setAuthStatus: () => {},
  authIsReady: false,
  email: "",
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isSuccess, isError } = useGetSession();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authIsReady, setAuthIsReady] = useState<boolean>(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    if (isSuccess && data) {
      setAuthenticated(true);
      setAuthIsReady(true);
    }

    if (isError) {
      setAuthenticated(false);
      setAuthIsReady(true);
    }
  }, [data, isSuccess, isError]);

  const state: AuthState = {
    authenticated,
    setAuthStatus: (value: boolean) => {
      setAuthenticated(value);
      if (!value) {
        queryClient.invalidateQueries({
          queryKey: ["get-session"],
        });
      }
    },
    loading: isLoading,
    authIsReady: authIsReady,
    email: data?.email || "",
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

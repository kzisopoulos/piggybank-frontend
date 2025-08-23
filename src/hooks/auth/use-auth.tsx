import { AuthContext } from "@/providers/auth/auth-provider";
import { useContext } from "react";

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("AuthContext cant be used outside of AuthProvider");
  }

  return ctx;
};

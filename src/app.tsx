import { RouterProvider } from "react-router";
import { useAuth } from "./hooks/auth/use-auth";
import { protectedRouter, publicRouter } from "./router";
import AppLoader from "./components/ui/app-loader";

export default function App() {
  const { authenticated, authIsReady } = useAuth();

  if (!authIsReady) return <AppLoader />;

  return (
    <RouterProvider router={authenticated ? protectedRouter : publicRouter} />
  );
}

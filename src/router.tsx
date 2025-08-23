import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "./layout/app-layout";
import OverviewPage from "./pages/overview/overview";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import GoalsPage from "./pages/goals/goals";
import AccountsPage from "./pages/accounts/accounts";
import SettingsPage from "./pages/settings/settings";

export const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export const protectedRouter = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: OverviewPage,
      },
      {
        path: "/goals",
        Component: GoalsPage,
      },
      {
        path: "/accounts",
        Component: AccountsPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

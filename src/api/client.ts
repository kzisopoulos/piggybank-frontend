interface Endpoints {
  // Auth endpoints
  login: string;
  register: string;
  session: string;
  logout: string;
  // Account endpoints
  accounts: string;
  categories: string;
  subcategories: string;
}

export const endpoints: Endpoints = {
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  session: "/api/v1/auth/session",
  logout: "/api/v1/auth/logout",

  accounts: "/api/v1/accounts",

  categories: "/api/v1/categories",
  subcategories: "/api/v1/categories/subcategories",
};

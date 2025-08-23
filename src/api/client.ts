interface Endpoints {
  // Auth endpoints
  login: string;
  register: string;
  session: string;
  logout: string;
}

export const endpoints: Endpoints = {
  login: "/api/v1/auth/login",
  register: "api/v1/auth/register",
  session: "/api/v1/auth/session",
  logout: "/api/v1/auth/logout",
};

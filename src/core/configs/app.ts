export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
  HIMTI_SECRET_KEY: import.meta.env.HIMTI_SECRET_KEY ?? "",
  HIMTI_HEADER_KEY: import.meta.env.HIMTI_HEADER_KEY ?? "",
  TOKEN_KEY: btoa(`token${import.meta.env.HIMTI_SECRET_KEY ?? ""}`),
  REFRESH_TOKEN_KEY: btoa(`refresh${import.meta.env.HIMTI_SECRET_KEY ?? ""}`),
};

export const API_ENDPOINT = {
  auth: {
    refreshToken: `${CONFIG_APP.BASE_URL}/auth/refresh-token`,
    login: `${CONFIG_APP.BASE_URL}/auth/login`,
    register: `${CONFIG_APP.BASE_URL}/auth/register`,
  },
  check: `${CONFIG_APP.BASE_URL}/check`,
  user: {
    base: `${CONFIG_APP.BASE_URL}/users`,
    profile: `${CONFIG_APP.BASE_URL}/users/profile/me`,
  },
  friend: {
    base: `${CONFIG_APP.BASE_URL}/friends`,
    add: `${CONFIG_APP.BASE_URL}/friends/add`,
  },
};

import { handleRefreshToken } from "@/helper/common";
import { IErrorResponse } from "@/types/common.type";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.NEXT_APP_API_URL
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token_access");

    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
      config.headers.setAccept("application/json");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { data, status } = error.response;

    if (error?.response?.status === 401 && !error.config?.url?.includes("/auth")) {
      const response = await handleRefreshToken();
      if (!response) {
        return;
      }

      const access_token = response.access_token;

      instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      cookies.set("token_access", response.access_token, {
        path: "/",
        domain: process.env.NEXT_BASE_URL
      });
      cookies.set("token_ref", response.refresh_token, {
        path: "/",
        domain: process.env.NEXT_BASE_URL
      });

      return instance(error?.request?.responseURL);
    }

    return Promise.reject({
      errorCode: status,
      message: data.message
    } as IErrorResponse);
  }
);

export default instance;

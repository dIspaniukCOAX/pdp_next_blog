"use client";

import instance from "@/lib/instance";
import { signOut } from "next-auth/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const appLogout = () => {
  signOut({
    redirect: true,
    callbackUrl: `${window.location.origin}/auth/signin`,
  });
  cookies.remove("token_access", {
    path: "/",
    domain: process.env.NEXT_BASE_URL,
  });
  cookies.remove("token_ref", { path: "/", domain: process.env.NEXT_BASE_URL });
};

export const handleRefreshToken = async () => {
  const accessToken = cookies.get("token_access");
  const refreshToken = cookies.get("token_ref");

  if (accessToken === "undefined" || refreshToken === "undefined") {
    appLogout();
  }
  if (!accessToken && !refreshToken){
    appLogout();
  };

  const result: {
    access_token: string,
    refresh_token: string
  } = await instance.post("/api/refreshToken", {
    accessToken,
    refreshToken
  });

  return result
};

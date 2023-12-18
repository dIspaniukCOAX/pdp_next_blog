"use client";

import { IErrorResponse } from "@/types/common.type";
import { ISignInRequest, ISignInResponse } from "@/types/signin.type";
import { UseMutationOptions, useMutation } from "react-query";
import Cookies from "universal-cookie";
import { getSession, signIn } from "next-auth/react";
import { getNotification } from "@/helper/notifications";
import { NotificationsTypes } from "@/enum/notification.enum";

export const APP_DOMAIN = process.env.NEXT_BASE_URL || "";

const cookies = new Cookies();

const postUserData = async (data: ISignInRequest): Promise<any> => {
  await signIn("credentials", { ...data, redirect: false });
  const session = await getSession();

  return {
    id: session?.user.id,
    username: session?.user.username,
    email: session?.user.email,
    access_token: session?.user.access_token,
    refresh_token: session?.user.refresh_token
  };
};

export const useUserLogin = (
  options?: UseMutationOptions<ISignInResponse, IErrorResponse, ISignInRequest>
) => {
  const { mutate, ...rest } = useMutation(
    ["login"],
    postUserData,
    {
      ...options,
      onSuccess: (data) => {
        cookies.set("token_access", data?.access_token, {
          path: "/",
          domain: APP_DOMAIN,
        });
        cookies.set("token_ref", data?.refresh_token, {
          path: "/",
          domain: APP_DOMAIN,
        });

        getNotification({
          type: NotificationsTypes.SUCCESS,
          message: "Authentication was successful",
        });
      },
      onError: () =>
        getNotification({
          type: NotificationsTypes.ERROR,
          message: "Invalid credentials",
        }),
    }
  );
  return {
    postUserData: mutate,
    ...rest
  };
};

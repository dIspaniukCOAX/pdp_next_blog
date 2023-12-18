"use client";

import React from "react";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthNavigation = () => {
  const session = useSession();
  const isAuth = !!session.data?.user.access_token;

  if (!isAuth) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center">
        <span>{session.data?.user.email}</span>
        <Link
          href="/posts/create"
          className="px-5 py-2 ml-5 text-sm font-semibold leading-6 text-black border-2 rounded-xl"
        >
          Create Post
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
};

export default AuthNavigation;

"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

interface IProvider {
  children: ReactNode;
}

const Provider: FC<IProvider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

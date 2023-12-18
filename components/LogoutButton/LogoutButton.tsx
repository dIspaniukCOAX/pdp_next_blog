"use client";

import { appLogout } from "@/helper/common";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="px-5 py-2 ml-5 bg-blue-500 text-sm font-semibold leading-6 text-white rounded-xl"
      onClick={() => appLogout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

import React from "react";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export const Header = () => {
  return (
    <header className="bg-white shadow-xl w-full">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="text-black font-bold">PDP Project</div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <AuthNavigation />
        </div>
      </nav>
    </header>
  );
};

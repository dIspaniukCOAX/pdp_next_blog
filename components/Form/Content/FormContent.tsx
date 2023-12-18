"use client";

import { PropsWithChildren } from "react";

interface IFormContent {
  buttonText: string;
  handleSubmit: () => void;
}

export default function FormContent<T>({
  children,
  buttonText,
  handleSubmit,
}: PropsWithChildren<IFormContent>) {
  return (
    <form
      noValidate={true}
      autoComplete="off"
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit}
    >
      {children}
      <button
        type="submit"
        className="bg-blue-500 text-white w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
      >
        {buttonText}
      </button>
    </form>
  );
}

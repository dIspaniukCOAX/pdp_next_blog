"use client";

import React, { FC, PropsWithChildren } from "react";
import Field from "./Field/Field";
import FormContent from "./Content/FormContent";
import Footer from "./Footer/Footer";

export interface ContentComposition {
  Field?: FC<PropsWithChildren>;
  Footer?: FC<PropsWithChildren>;
}

interface IForm {
  children: React.ReactNode;
  title: string;
  classes?: string;
}

function Form({ children, title, classes }: PropsWithChildren<IForm> & ContentComposition) {
  return (
    <div
      className={`${
        classes || "max-w-md"
      } w-full bg-white rounded-lg shadow border md:mt-0 xl:p-0 text-black shadow-xl`}
    >
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
Form.Content = FormContent;
Form.Field = Field;
Form.Footer = Footer;

export default Form;

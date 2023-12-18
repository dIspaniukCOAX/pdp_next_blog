"use client";

import React, { ReactNode } from "react";
import styles from '@/assets/styles/components/form.module.scss';

interface IField {
  labelText: string;
  children: ReactNode;
  labelId: string;
  errorMessage: string | undefined;
}

export default function Field({ labelText, errorMessage, labelId, children }: IField) {
  return (
    <div className="relative">
      <label
        htmlFor={labelId}
        className="block mb-2 text-l font-medium text-gray-900"
      >
        {labelText}
      </label>
      {children}
      <div className={styles['form__error']}>
        { errorMessage }
      </div>
    </div>
  );
}

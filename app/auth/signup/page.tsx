"use client";

import { Form } from "@/components";
import { Input } from "antd";
import Link from "next/link";
import styles from "@/assets/styles/pages/auth.module.scss";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/signup.schema";
import instance from "@/lib/instance";
import { ISignUp } from "@/types/signup.type";
import { getNotification } from "@/helper/notifications";
import { NotificationsTypes } from "@/enum/notification.enum";
import { IErrorResponse } from "@/types/common.type";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: ISignUp) => {
    try {
      await instance.post("/api/user", data);
      router.push("signin");
    } catch (error) {
      setError("root.authError", {
        type: "manual",
        message: (error as IErrorResponse).message,
      });
      getNotification({
        type: NotificationsTypes.ERROR,
        message: `${(error as IErrorResponse).message}`,
      });
    }
  };

  return (
    <Form title="Create account">
      <Form.Content handleSubmit={handleSubmit(onSubmit)} buttonText="Sign Up">
        <Form.Field
          errorMessage={errors.username?.message}
          labelText="Username"
          labelId="username"
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username"
              />
            )}
          />
        </Form.Field>
        <Form.Field
          errorMessage={errors.email?.message}
          labelText="Your Email"
          labelId="email"
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                formNoValidate={false}
                id="email"
                className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
              />
            )}
          />
        </Form.Field>
        <Form.Field
          errorMessage={errors.password?.message}
          labelText="Your Password"
          labelId="password"
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password
                {...field}
                id="password"
                placeholder="Password"
                className={`${styles["auth__field-input"]} bg-gray-50 flex border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-200 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500`}
              />
            )}
          />
        </Form.Field>
      </Form.Content>
      <Form.Footer>
        <p className="mb-3 text-red-500 text-center">
          {errors?.root?.authError.message}
        </p>
        <p className="text-sm font-light text-gray-500 text-gray-400 text-center">
          Already have an account?
          <Link
            href="signin"
            className="font-medium text-primary-600 hover:underline text-primary-500 pl-2"
          >
            Sign in
          </Link>
        </p>
      </Form.Footer>
    </Form>
  );
}
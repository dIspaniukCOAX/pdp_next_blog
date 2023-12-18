"use client";

import React from "react";
import { Form, Loader } from "@/components";
import { Input } from "antd";
import styles from "@/assets/styles/pages/auth.module.scss";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/schemas/signin.schema";
import { useRouter } from "next/navigation";
import { useUserLogin } from "@/query/Login/useUserLogin";
import { ISignInRequest } from "@/types/signin.type";

export default function SignIn() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });
  const { postUserData, isLoading } = useUserLogin();
  const onSubmit = async (data: ISignInRequest) => {
    postUserData(data);
    router.push("/posts")
  };

  if(isLoading) {
    return <Loader isFullPageLoader={true} />
  }

  return (
    <>
      <Form title="Sign in to your account">
        <Form.Content
          handleSubmit={handleSubmit(onSubmit)}
          buttonText="Sign In"
        >
          <Form.Field errorMessage={errors.email?.message} labelText="Your Email" labelId="email">
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
          <Form.Field errorMessage={errors.password?.message} labelText="Your Password" labelId="password">
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
          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline text-primary-500"
            >
              Forgot password?
            </a>
          </div>
        </Form.Content>
        <Form.Footer>
          <span>Don’t have an account yet?</span>
          <Link
            href="signup"
            className="font-medium text-primary-600 hover:underline text-primary-500 pl-2"
          >
            Sign up
          </Link>
        </Form.Footer>
      </Form>
    </>
  );
}

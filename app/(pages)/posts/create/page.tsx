"use client";

import { Form } from "@/components";
import { Input, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BackIcon from "@/assets/svg/BackIcon.svg";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { EmploymentType } from "@/enum/post.enum";
import TextEditor from "@/components/TextEditor/TextEditor";
import instance from "@/lib/instance";

const PostCreate = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      campaignName: "",
      yearSalary: 0,
      location: "",
      employment: EmploymentType.FULL_TIME,
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await instance.post('/api/posts', data)
      router.push("/posts")
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <div>
      <button
        onClick={router.back}
        className="px-5 py-2 mb-10 text-sm font-semibold leading-6 text-black border-2 rounded-xl flex hover:shadow-xl transition-shadow duration-300"
      >
        <Image className="mr-2" width={20} src={BackIcon} alt="back" />
        Back
      </button>
      <Form classes="max-w-full" title="Create Post">
        <Form.Content
          buttonText="Save Post"
          handleSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full gap-10">
            <div className="w-1/2">
              <Form.Field labelText="Title" labelId="title" errorMessage="">
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Post Title"
                    />
                  )}
                />
              </Form.Field>
            </div>
            <div className="w-1/2">
              <Form.Field
                labelText="Campaign Name"
                labelId="campaignName"
                errorMessage=""
              >
                <Controller
                  control={control}
                  name="campaignName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="campaignName"
                      className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Campaign Name"
                    />
                  )}
                />
              </Form.Field>
            </div>
          </div>
          <div className="flex w-full gap-10">
            <div className="w-1/2">
              <Form.Field
                labelText="Year Salary in $"
                labelId="yearSalary"
                errorMessage=""
              >
                <Controller
                  control={control}
                  name="yearSalary"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      id="yearSalary"
                      className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Year Salary"
                    />
                  )}
                />
              </Form.Field>
            </div>
            <div className="w-1/2">
              <Form.Field
                labelText="Location"
                labelId="location"
                errorMessage=""
              >
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="location"
                      className="bg-gray-50 border border-gray-200 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Location"
                    />
                  )}
                />
              </Form.Field>
            </div>
          </div>
          <div
            className="w-1/2 gap-10"
          >
            <Form.Field
              labelText="Employment Time"
              labelId="employment"
              errorMessage=""
            >
              <Controller
                control={control}
                name="employment"
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue={EmploymentType.FULL_TIME}
                    className="w-full h-11"
                    options={[
                      {
                        value: EmploymentType.FULL_TIME,
                        label: EmploymentType.FULL_TIME,
                      },
                      {
                        value: EmploymentType.PART_TIME,
                        label: EmploymentType.PART_TIME,
                      },
                    ]}
                  />
                )}
              />
            </Form.Field>
          </div>

          <Form.Field
            labelText="Description"
            labelId="description"
            errorMessage=""
          >
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextEditor 
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write Something..."
                />
              )}
            />
          </Form.Field>
        </Form.Content>
      </Form>
    </div>
  );
};

export default PostCreate;

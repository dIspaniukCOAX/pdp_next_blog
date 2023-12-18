"use client";

import { EmploymentType } from "@/enum/post.enum";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form } from "..";
import { Input, Select } from "antd";
import TextEditor from "../TextEditor/TextEditor";
import { IPost } from "@/types/post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "@/schemas/post.schema";

const PostContent = ({
  postData,
  onSubmit
}: {
  postData?: IPost | undefined;
  onSubmit: (data: any) => void;
}) => {
  const isEdit = !!postData;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      campaign_name: "",
      year_salary: "0",
      location: "",
      employment: EmploymentType.FULL_TIME,
      description: ""
    },
    resolver: yupResolver(postSchema)
  });

  useEffect(() => {
    if (postData) {
      reset({
        title: postData.title,
        campaign_name: postData.campaign_name,
        year_salary: postData.year_salary,
        location: postData.location,
        employment: postData.employment as EmploymentType,
        description: postData.description
      });
    }
  }, [postData]);

  return (
    <Form classes="max-w-full" title={`${isEdit ? "Edit" : "Create"} Post`}>
      <Form.Content buttonText="Save Post" handleSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-10">
          <div className="w-1/2">
            <Form.Field labelText="Title" labelId="title" errorMessage={errors.title?.message}>
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
              labelId="campaign_name"
              errorMessage={errors.campaign_name?.message}
            >
              <Controller
                control={control}
                name="campaign_name"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="campaign_name"
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
              labelId="year_salary"
              errorMessage={errors.year_salary?.message}
            >
              <Controller
                control={control}
                name="year_salary"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={1}
                    id="year_salary"
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
              errorMessage={errors.location?.message}
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
        <div className="w-1/2 gap-10">
          <Form.Field
            labelText="Employment Time"
            labelId="employment"
            errorMessage={errors.employment?.message}
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
                      label: EmploymentType.FULL_TIME
                    },
                    {
                      value: EmploymentType.PART_TIME,
                      label: EmploymentType.PART_TIME
                    }
                  ]}
                />
              )}
            />
          </Form.Field>
        </div>

        <Form.Field
          labelText="Description"
          labelId="description"
          errorMessage={errors.description?.message}
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
  );
};

export default PostContent;

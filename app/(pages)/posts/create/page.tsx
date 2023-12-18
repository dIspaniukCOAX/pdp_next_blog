"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import BackIcon from "@/assets/svg/BackIcon.svg";
import React from "react";
import PostContent from "@/components/Modify/PostContent";
import { useCreatePost } from "@/query/Posts/useCreatePost";

const PostCreate = () => {
  const router = useRouter();
  const { addPost } = useCreatePost();

  const onSubmit = async (data: any) => {
    try {
      addPost(data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.push("/posts")}
        className="px-5 py-2 mb-10 text-sm font-semibold leading-6 text-black border-2 rounded-xl flex hover:shadow-xl transition-shadow duration-300"
      >
        <Image className="mr-2" width={20} src={BackIcon} alt="back" />
        Back
      </button>
      <div className="mb-10">
        <PostContent onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default PostCreate;

"use client";

import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import BackIcon from "@/assets/svg/BackIcon.svg";
import React from "react";
import PostContent from "@/components/Modify/PostContent";
import { useGetPost } from "@/query/Posts/useGetPost";
import { Loader } from "@/components";
import { useUpdatePost } from "@/query/Posts/useUpdatePost";
import { IPost } from "@/types/post.type";
import { useSession } from "next-auth/react";
import { useDeletePost } from "@/query/Posts/useDeletePost";

const PostEdit = ({
  params,
}: {
  params?: {
    postId: string;
  };
}) => {
  const router = useRouter();
  const session = useSession();
  const { postData, isLoading, isError, error } = useGetPost(params?.postId || "");
  const { updatePost } = useUpdatePost(params?.postId || "")
  const { deletePost } = useDeletePost();

  if (isLoading) {
    return <Loader isFullPageLoader={true} />;
  }

  if ((isError && error?.errorCode === 404 ) || (session.data?.user.id !== postData.authorId)) {
    return notFound();
  }

  const handleSubmit = (data: IPost) => {
    updatePost(data as any)
  }

  const handleDelete = () => {
    if(params?.postId){
      deletePost(params?.postId)
    }
  }

  return (
    <div>
      <div className="flex w-full justify-between">
        <button
          onClick={() => router.push("/posts")}
          className="px-5 py-2 mb-10 text-sm font-semibold leading-6 text-black border-2 rounded-xl flex hover:shadow-xl transition-shadow duration-300"
        >
          <Image className="mr-2" width={20} src={BackIcon} alt="back" />
          Back
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 px-5 py-2 mb-10 text-sm font-semibold leading-6 text-white border-2 rounded-xl flex hover:shadow-xl transition-shadow duration-300"
        >
          Delete
        </button>
      </div>
      <div className="mb-10">
        <PostContent
          postData={postData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PostEdit;

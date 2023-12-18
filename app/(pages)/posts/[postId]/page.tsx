"use client";

import { Loader } from "@/components";
import PostView from "@/components/PostView/PostView";
import { useGetPost } from "@/query/Posts/useGetPost";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import BackIcon from "@/assets/svg/BackIcon.svg";
import React from "react";
import Image from "next/image";

const PostsContent = ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const router = useRouter();
  const { postId } = params;
  const { postData, isLoading, isError, error } = useGetPost(postId);
  const session = useSession();
  const isAuthor = session.data?.user.id === postData?.authorId;

  if (isError && error?.errorCode === 404) {
    return notFound();
  }

  if (isLoading) {
    return <Loader isFullPageLoader={true} />;
  }

  return (
    <div>
      <div className="flex mb-10 w-full justify-between items-center">
        <button
          onClick={() => router.push("/posts")}
          className="px-5 py-2 text-sm font-semibold leading-6 text-black border-2 rounded-xl flex hover:shadow-xl transition-shadow duration-300"
        >
          <Image className="mr-2" width={20} src={BackIcon} alt="back" />
          Back
        </button>
        {isAuthor && (
          <button
            className="px-5 py-2 text-l font-semibold leading-6 text-black border-2 rounded-xl"
            onClick={() => router.push(`${postData.id}/edit`)}
          >
            Edit
          </button>
        )}
      </div>

      <PostView postData={postData} />
    </div>
  );
};

export default PostsContent;

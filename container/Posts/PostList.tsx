"use client";

import React, { useEffect, useState } from "react";
import PostsCard from "@/components/PostsCard/PostsCard";
import { IPost } from "@/types/post.type";
import { Loader } from "@/components";
import { useGetPosts } from "@/query/Posts/useGetPosts";

const PostList = () => {
  const { listOfPosts, isLoading  } = useGetPosts();

  if (isLoading) {
    return <Loader isFullPageLoader={true} />;
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full px-4 py-4 mx-auto text-left lg:py-10 ">
      {!(listOfPosts as unknown as IPost[])?.length ? (
        <span className="text-center text-gray-500">
          No posts have been created yet.
        </span>
      ) :(listOfPosts as unknown as IPost[])?.map((post: IPost, index: number) => (
        <PostsCard key={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;

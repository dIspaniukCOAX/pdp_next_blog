"use client";

import React, { useEffect, useState } from "react";
import PostsCard from "@/components/PostsCard/PostsCard";
import { IPost } from "@/types/post.type";
import { Loader } from "@/components";
import instance from "@/lib/instance";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance.get("/api/posts").then((data: any) => {
      setPosts(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loader isFullPageLoader={true} />;
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full px-4 py-4 mx-auto text-left lg:py-10 ">
      {posts?.map((post: IPost, index: number) => (
        <PostsCard key={index} post={post} />
      ))}
    </div>
  );
};

export default PostList;

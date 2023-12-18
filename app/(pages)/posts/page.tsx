import PostList from "@/container/Posts/PostList";
import React from "react";

const Posts = () => {
  return (
    <div>
      <span className="block mb-4 text-xs font-semibold leading-4 tracking-widest text-center text-blue-500 uppercase dark:text-gray-400">
        Our posts
      </span>
      <h1 className=" text-4xl font-bold capitalize text-black text-center">
        Posts List
      </h1>
      <section className="flex items-center py-8 font-poppins ">
        <PostList />
      </section>
    </div>
  );
};

export default Posts;

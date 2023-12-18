"use client";

import { IPost } from "@/types/post.type";
import parse from "html-react-parser";
import React from "react";
import { formatDistance } from "date-fns";

const PostView = ({ postData }: { postData: IPost }) => {
  return (
    <div className="flex flex-col w-full mb-10 bg-white rounded-lg p-10 shadow border text-black shadow-xl">
      <h1 className="text-4xl font-bold capitalize text-black mb-5">{postData.title}</h1>
      <div className="flex flex-col gap-3 text-l">
        <div>
          <strong>Campaign:</strong> {postData.campaign_name}
        </div>
        <div>
          <strong>Location:</strong> {postData.location}
        </div>
        <div>
          <strong>Employment time:</strong> {postData.employment}
        </div>
        <div>
          <strong>Year Salary:</strong> {postData.year_salary}$
        </div>
        <div>
          <strong>Author:</strong> {postData?.author?.username}
        </div>
        <div>
          <strong>Published:</strong>{" "}
          {formatDistance(postData?.author?.created_at, new Date(), { addSuffix: true })}
        </div>
        <div>
          <strong>Updated:</strong>{" "}
          {formatDistance(postData?.author?.updated_at, new Date(), { addSuffix: true })}
        </div>
      </div>
      <div className="text-l mt-10">
        <h2 className="text-2xl font-bold capitalize text-black mb-5">Description:</h2>
        {parse(postData.description)}
      </div>
    </div>
  );
};

export default PostView;

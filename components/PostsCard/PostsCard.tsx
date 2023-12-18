import { IPostCard } from "@/types/post.type";
import Link from "next/link";
import React, { FC } from "react";
import parse from "html-react-parser";
import styles from "@/assets/styles/pages/post.module.scss";
import FileIcon from "@/assets/svg/FileIcon.svg";
import CalendarIcon from "@/assets/svg/CalendarIcon.svg";
import LocationIcon from "@/assets/svg/LocationIcon.svg";

import { formatDistance } from "date-fns";
import Image from "next/image";
const PostsCard: FC<IPostCard> = ({ post }) => {
  const { title, description, campaign_name, year_salary, location, employment, created_at } = post;
  return (
    <div className="p-4 mb-6 rounded-md bg-gray-50 shadow-xl border-gray-200 border-2 max-w-3xl w-full">
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="inline-block mb-2 text-xs font-semibold text-blue-500 uppercase hover:text-blue-600 text-black"
        >
          {campaign_name}
        </a>
        <span className="mb-2 text-xs text-gray-500 text-black">
          {formatDistance(created_at, new Date(), { addSuffix: true })}
        </span>
      </div>
      <h2 className="mb-4 text-xl font-semibold text-black truncate">{title}</h2>
      <div className="flex flex-wrap items-center mb-4 ">
        <a
          href="#"
          className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700 text-black"
        >
          <Image src={FileIcon} alt="file" className="mr-1" />${year_salary} /year
        </a>
        <a
          href="#"
          className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700 text-black"
        >
          <Image src={CalendarIcon} alt="calendar" className="mr-1" />
          {employment}
        </a>
        <a
          href="#"
          className="flex items-center mb-2 mr-4 text-sm text-gray-500 md:mb-0 hover:text-gray-700 text-black"
        >
          <Image src={LocationIcon} alt="location" />
          {location}
        </a>
      </div>
      <div className={styles["post__content"]}>
        <div className="mb-4 text-sm text-black">{parse(description)}</div>
      </div>
      <div className="flex flex-wrap items-center ">
        <Link
          href={`posts/${post.id}`}
          className="flex items-center px-4 py-2 mb-2 mr-4 text-sm text-gray-100 bg-blue-500 rounded-md md:mb-0 hover:bg-blue-600 dark:text-gray-100 dark:hover:bg-blue-500 dark:bg-blue-400"
        >
          Read More
        </Link>
        <span className="flex items-center text-sm md:ml-auto text-black ">
          Suggest reward:{" "}
          <span className="ml-2"> {(parseFloat(year_salary) / 12).toFixed(2)} USD</span>
        </span>
      </div>
    </div>
  );
};

export default PostsCard;

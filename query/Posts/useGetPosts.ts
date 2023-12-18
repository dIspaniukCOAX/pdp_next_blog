import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { IPost } from "@/types/post.type";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

const getPosts = async () => {
  const response = await instance.get("/api/posts");
  return response;
};

export const useGetPosts = () => {
  const { data, ...rest } = useQuery<
    Promise<AxiosResponse<IPost[]>>,
    IErrorResponse
  >(["get-all-posts"], async () => await getPosts());
  return {
    listOfPosts: data,
    ...rest
  };
};

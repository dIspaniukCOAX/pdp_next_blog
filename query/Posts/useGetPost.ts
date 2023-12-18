import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { IPost } from "@/types/post.type";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

const getPost = async (id: string) => {
  const response = await instance.get("/api/post", {
    params: {
        postId: id
    }
  });
  return response;
};

export const useGetPost = (id: string) => {
  const { data, ...rest } = useQuery<
    Promise<AxiosResponse<IPost[]>>,
    IErrorResponse
  >(["get-post", id], async () => await getPost(id));
  return {
    postData: data as unknown as IPost,
    ...rest
  };
};

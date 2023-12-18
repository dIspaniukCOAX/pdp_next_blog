import { NotificationsTypes } from "@/enum/notification.enum";
import { getNotification } from "@/helper/notifications";
import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { IPost } from "@/types/post.type";
import { ISignUpResponse } from "@/types/signup.type";
import { useRouter } from "next/navigation";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";

const addPost = async (data: IPost) => {
    const response = await instance.post("/api/post", data);

    return response as unknown as ISignUpResponse
}

export const useCreatePost = (
  options?: UseMutationOptions<ISignUpResponse, IErrorResponse, IPost>
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, ...rest } = useMutation(["add-post"], addPost, {
    ...options,
    onSuccess: async () => {
      getNotification({
        type: NotificationsTypes.SUCCESS,
        message: "The post has been successfully added."
      });
      await queryClient.invalidateQueries(["get-all-posts"], { exact: false });
      await queryClient.invalidateQueries(["get-post"], { exact: false });
      
      router.push("/posts")
    },
    onError: (err) => getNotification({
      type: NotificationsTypes.ERROR,
      message: `Something went wrong: ${err.message}`
    })
  });

  return { addPost: mutate, ...rest };
};

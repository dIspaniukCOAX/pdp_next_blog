import { NotificationsTypes } from "@/enum/notification.enum";
import { getNotification } from "@/helper/notifications";
import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { IPost } from "@/types/post.type";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";

const updatePost = async (id: string, data: IPost): Promise<IPost> => {
    const response = await instance.patch("/api/post", data, {
        params: {
            postId: id
        }
    })
    return response as unknown as IPost
}

export const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<IPost, IErrorResponse, Promise<AxiosResponse<IPost>>>
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, ...rest } = useMutation(
    ["update-post"],
    (data) => updatePost(id, data as unknown as IPost),
    {
      ...options,
      onSuccess: async () => {
        await queryClient.invalidateQueries(["get-all-posts"], { exact: false });

        getNotification({
          type: NotificationsTypes.SUCCESS,
          message: "The post has been successfully updated."
        });

        router.push("/posts")
      },
      onError: (err) => getNotification({
        type: NotificationsTypes.ERROR,
        message: `Something went wrong: ${err.message}`
      })
    }
  );

  return { updatePost: mutate, ...rest };
};

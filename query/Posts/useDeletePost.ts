import { NotificationsTypes } from "@/enum/notification.enum";
import { getNotification } from "@/helper/notifications";
import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { useRouter } from "next/navigation";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";

const deletePost = async (id: string) => {
    const response = await instance.delete("/api/post", {
        params: {
            postId: id
        }
    })

    return response as unknown as Object
}

export const useDeletePost = (
  options?: UseMutationOptions<Object, IErrorResponse, string>
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, ...rest } = useMutation(["delete-post"], deletePost, {
    ...options,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-all-posts"], { exact: false });

      getNotification({
        type: NotificationsTypes.SUCCESS,
        message: "The post has been successfully deleted."
      });

      router.push("/posts")
    },
    onError: (err) => getNotification({
      type: NotificationsTypes.ERROR,
      message: `Something went wrong: ${err.message}`
    })
  });

  return { deletePost: mutate, ...rest };
};

import { NotificationsTypes } from "@/enum/notification.enum";
import { getNotification } from "@/helper/notifications";
import instance from "@/lib/instance";
import { IErrorResponse } from "@/types/common.type";
import { ISignInRequest, ISignInResponse } from "@/types/signin.type";
import { ISignUp } from "@/types/signup.type";
import { useRouter } from "next/navigation";
import { UseMutationOptions, useMutation } from "react-query";

const addUser = async (data: ISignUp) => {
    const response = await instance.post("/api/user", data);

    return response as unknown as ISignUp
}

export const useCreateUser = (
  options?: UseMutationOptions<ISignUp, IErrorResponse, ISignUp>
) => {
  const router = useRouter();

  const { mutate, ...rest } = useMutation(["add-user"], addUser, {
    ...options,
    onSuccess: async () => {
      getNotification({
        type: NotificationsTypes.SUCCESS,
        message: "You have created an account!"
      });
      
      router.push("/auth/signin")
    },
    onError: (err) => getNotification({
      type: NotificationsTypes.ERROR,
      message: `Something went wrong: ${err.message}`
    })
  });

  return { addUser: mutate, ...rest };
};

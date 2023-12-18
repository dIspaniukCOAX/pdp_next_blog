import { NotificationsTypes } from "@/enum/notification.enum";
import { toast } from "react-toastify";

export const getNotification = ({
  type,
  message,
}: {
  type: NotificationsTypes;
  message: string;
}) => {
  switch (type) {
    case NotificationsTypes.ERROR:
      toast.error(message);
      break;
    case NotificationsTypes.SUCCESS:
      toast.success(message);
      break;
    default:
      break;
  }
};

import axios from "axios";

const teacherUrl =
  "https://notificationserverclass.herokuapp.com/api/v2/teachers";

export const sendNotification = (newNotification, token) =>
  axios.post(`${teacherUrl}/notifications`, newNotification, {
    headers: { "x-auth-token": token },
  });

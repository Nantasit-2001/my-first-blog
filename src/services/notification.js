
import API_Auth from "./auth/api.mjs";
const API_URL = `${import.meta.env.VITE_API_URL}/notifications`; // API URL

export const axiosGetNotificationAdmin = () => {
  return API_Auth.get(`${API_URL}/admin`);
};

export const axiosGetNotification = (userid) => {
  console.log(userid)
  return API_Auth.get(`${API_URL}/user/${userid}`);
};

export const axiosPatchNotification = (id_notification) => {
  return API_Auth.patch(`${API_URL}/read`,{id_notification});
};
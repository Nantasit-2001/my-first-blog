import API_Auth from "./auth/api.mjs";
const API_URL = `${import.meta.env.VITE_API_URL}/notifications`; // API URL

export const axiosFetchPosts = (to_user_Id,type) => {
  return API_Auth.post(`${API_URL}`,{to_user_Id,type});
};

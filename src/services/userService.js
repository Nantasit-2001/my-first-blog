import axios from "axios";
import { commonjs } from "globals";

const API_URL = `${import.meta.env.VITE_API_URL}/profile`;

export const axiosGetUser = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const axiosResetPassword = ({currentPassword, newPassword}) =>{
    return axios.patch(API_URL+"/reset-password",{currentPassword, newPassword},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
} 

export const axiosResetProfile = ({ image, name, username }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("image", image);
  return axios.patch(API_URL + "/reset-profile", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
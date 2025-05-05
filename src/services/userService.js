import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/profile`;

export const axiosResetPassword = ({currentPassword, newPassword}) =>{
    return axios.patch(API_URL+"/reset-password",{currentPassword, newPassword},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
} 

export const axiosResetProfile = ({image, name, username}) =>{
  console.log(image,name,username)
  return axios.patch(API_URL+"/reset-profile", {image,name,username},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
}
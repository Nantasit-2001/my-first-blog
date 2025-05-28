import axios from "axios";
import API_Auth from "./auth/api.mjs";

const API_URL = `${import.meta.env.VITE_API_URL}/profile`;

export const axiosGetUser = () => {
  return API_Auth.get(API_URL, {});
};

export const axiosResetPassword = ({currentPassword, newPassword}) =>{
    return API_Auth.patch(API_URL+"/reset-password",{currentPassword, newPassword});
} 

export const axiosResetProfile = ({ image, name, username}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("image", image);
  return API_Auth.patch(API_URL + "/reset-profile", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const axiosfetchBio = ()=>{
  return API_Auth.get(API_URL+"/bio")
}

export const axiosUpdateBio = (text)=>{
  return API_Auth.post(API_URL+"/bio",{text})
}
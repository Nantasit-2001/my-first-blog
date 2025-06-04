import { data } from "react-router-dom";
import API_Auth from "./auth/api.mjs";
const API_URL = `${import.meta.env.VITE_API_URL}/category`; // API URL

//category
export const axiosgetCategory = () =>{
  return API_Auth.get(`${API_URL}`)
}

export const axiospostCategory = (category) =>{
  return API_Auth.post(`${API_URL}`,{category})
}

export const axiosUpdateCategory = (oldCategory,newCategory) =>{
  return API_Auth.put(`${API_URL}`,{oldCategory,newCategory})
}

export const axiosDeleteCategory = (category) =>{
  return API_Auth.delete(`${API_URL}`,{params: { category }})
}
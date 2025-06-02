import API_Auth from "./auth/api.mjs";
const API_URL = `${import.meta.env.VITE_API_URL}/Article`; // API URL

//optional add create
export const axiosgetArticleInfo = () =>{
  return API_Auth.get(`${API_URL}`)
}
export const axiosgetArticle = (postId) =>{
  return API_Auth.get(`${API_URL}/${postId}`)
}
export const axiosPostArticle = (postData,status) =>{
  const { image, category_id, title, description, content } = postData;
  const formData = new FormData();
  formData.append("category_id", category_id);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("status", status);
  formData.append("image", image);
  return API_Auth.post(`${API_URL}`,formData);
}
export const axiosUpdateArticle = (postId, updatedData,status,imageUrl) => {
  const { image, category_id, title, description, content } = updatedData;
  const formData = new FormData();
  formData.append("category_id", category_id);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("imageUrl", imageUrl);
  formData.append("status", status);
  if (image) {
    formData.append("image", image);
  }
  return API_Auth.put(`${API_URL}/${postId}`,formData);
}
export const axiosDeleteArticle = (postId) =>{
  return API_Auth.delete(`${API_URL}/${postId}`)  
}
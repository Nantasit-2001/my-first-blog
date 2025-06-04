
import API_Auth from "./auth/api.mjs";
const API_URL = `${import.meta.env.VITE_API_URL}/posts`; // API URL
// GET /posts?page=1&limit=6&category=xxx&keyword=xxx
export const axiosFetchPosts = (params) => {
  return API_Auth.get(`${API_URL}?keyword=${params.keyword}&page=${params.page}&limit=${params.limit}&category=${params.category}`);
};

// GET /posts/:postId
export const axiosfetchPostById = ({postId}) => {
  return API_Auth.get(`${API_URL}/${postId}`);
};

//patch /posts/:postId/like (use header)
export const axiosLike = ({ postId }) => {
  return API_Auth.patch(`${API_URL}/${postId}/like`);
};

//get /posts/:postId/comment
export const axiosFetchComment = ({ postId }) => {
  return API_Auth.get(`${API_URL}/${postId}/comment`);
}

// POST /posts/:postId/comment (use hearder)
export const axiosCreateComment = ( postId, comment) => {
  return API_Auth.post(`${API_URL}/${postId}/comment`,{comment});
}





//Admin
// POST /posts
export const axioscreatePost = (postData) => {
  return API_Auth.post(API_URL, postData);
};

// PUT /posts/:postId
export const axiosupdatePost = (postId, updatedData) => {
  return API_Auth.put(`${API_URL}/${postId}`, updatedData);
};

// DELETE /posts/:postId
export const axiosdeletePost = (postId) => {
  return API_Auth.delete(`${API_URL}`,{params: { postId }});
};

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/posts`; // API URL

// GET /posts?page=1&limit=6&category=xxx&keyword=xxx
export const axiosFetchPosts = (params) => {
  return axios.get(`${API_URL}?keyword=${params.keyword}&page=${params.page}&limit=${params.limit}&category=${params.category}`);
};

// GET /posts/:postId
export const axiosfetchPostById = ({postId}) => {
  return axios.get(`${API_URL}/${postId}`);
};

//patch /posts/:postId/like
export const axiosLike = ({ postId }) => {
  return axios.patch(`${API_URL}/${postId}/like`, null, { // Changed, was missing the null for data
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

//get /posts/:postId/comment
export const axiosFetchComment = ({ postId }) => {

  return axios.get(`${API_URL}/${postId}/comment`);
}

// POST /posts/:postId/comment
export const axiosCreateComment = ( postId, comment) => {
  return axios.post(`${API_URL}/${postId}/comment`,{comment},        
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// POST /posts
export const axioscreatePost = (postData) => {
  return axios.post(API_URL, postData);
};

// PUT /posts/:postId
export const axiosupdatePost = (postId, updatedData) => {
  return axios.put(`${API_URL}/${postId}`, updatedData);
};


// DELETE /posts/:postId
export const axiosdeletePost = (postId) => {
  return axios.delete(`${API_URL}/${postId}`);
};
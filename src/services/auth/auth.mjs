import API_Auth from './api.mjs';

// client
export const registerUser = async (formData) => {
    try {
      const response = await API_Auth.post('/auth/register', formData);
      if (response.status === 201) return response.data;
    } catch (error) {
      const status = error.response?.status;
      const field = error.response?.data?.field;
  
      if (status === 400 && field === "email") {
        throw new Error("email-taken");
      } else if (status === 400 && field === "username") {
        throw new Error("username-taken");
      }
  
      console.error("❌ Registration error on client:", error);
      throw new Error(error);
    }
  };

export const loginUser = async (formData) => {
    try {
        const response = await API_Auth.post('/auth/login', formData);
        if (response.status === 200) {
            return response.data;          
        } else {
            alert("Login failed!");
        }   
    } catch (error) {
        console.error("❌ Login error:", error);
        alert("Email or password incorrect!");
        }
};

export const loginAdmin = async (formData) => {
    try {
        const response = await API_Auth.post('/auth/loginAdmin', formData);
        if (response.status === 200) {
            return response.data;          
        }if(response.status === 403) {
            alert("Access denied: Admins only");
        }else {
            alert("Login failed!");
        }   
    } catch (error) {
        console.error("❌ Login error:", error);
        alert("Email or password incorrect!");
        }
};

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // มี token คืน true, ไม่มี คืน false
  }
  
  // TODO context มีปัญหา

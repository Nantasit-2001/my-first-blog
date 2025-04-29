import API_Auth from './api.mjs';

export const registerUser = async (formData) => {
  const response = await API_Auth.post('/auth/register', formData);
  console.log("----")
  if(response.status === 201) {
  return response.data;
}else{alert("register failed!");}
};

export const loginUser = async (formData) => {
    try {
        console.log("----")
        const response = await API_Auth.post('/auth/login', formData);
        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token);    
            return response.data;          
        } else {
            console.log("----2")
            alert("Login failed!");
        }
    } catch (error) {
        console.error("❌ Login error:", error);
        alert("Email or password incorrect!");
        }
};



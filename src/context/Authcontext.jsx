import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated } from "@/services/auth/auth.mjs";
import { axiosGetUser } from "@/services/userService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const init = async () => {
      const auth = isAuthenticated();
      setLoggedIn(auth);
      if (auth) {
        const userData = await axiosGetUser();
        setUser(userData);
      }
    };
    init();
  }, []);

  const loginWithToken = async (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
    const userData = await axiosGetUser();
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
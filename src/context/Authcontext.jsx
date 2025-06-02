import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated } from "@/services/auth/auth.mjs";
import { axiosGetUser } from "@/services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // ✅ เพิ่ม loading

  useEffect(() => {
    const init = async () => {
      const auth = isAuthenticated();
      setLoggedIn(auth);
      if (auth) {
        try {
          const userData = await axiosGetUser();
          setUser(userData);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setUser(null);
          setLoggedIn(false);
        }
      }
      setLoading(false); // ✅ โหลดเสร็จแล้ว
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
    <AuthContext.Provider value={{ loggedIn, user, loading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// UserContext.jsx
import { createContext, useState } from "react";
import { useAuthentication, useUser } from "../hooks/apiHooks";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { auth } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const login = await auth.postLogin(credentials);
      console.log(login);
      localStorage.setItem("TOKEN", login.token);
      setUser(login.user);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("TOKEN");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      if (token && token != "") {
        const userData = await getUserByToken();
        setUser(userData);
        navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };

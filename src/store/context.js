import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  Login: () => {},
  Logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // console.log("constext",token)
  const isLoggedIn = !!token;
  const LoginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const LogOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    let pid = setTimeout(() => {
        // console.log("timeout")
      LogOutHandler();
    }, 600000);
    return (
        // console.log("cleanup",pid),
        clearTimeout(pid)
    )
  });

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    Login: LoginHandler,
    Logout: LogOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

import { createContext, useState } from "react";

export const AuthContext = createContext({
     token : "",
     isLoggedIn : false,
     Login : ()=>{},
     Logout : ()=>{},
});

const AuthContextProvider = ({children})=>{
    const [token,setToken ] = useState(null);
    const isLoggedIn = !!token;
    const LoginHandler = (token)=>{
        setToken(token);
    }
    const LogOutHandler = ()=>{
        setToken(null);
    }

    const contextValue = {
        token : token,
        isLoggedIn : isLoggedIn,
        Login : LoginHandler,
        Logout : LogOutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
             {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
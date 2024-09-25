import { createContext, useState } from "react"

export const LoginStateContext = createContext();

export const LoginStateProvider = ({children})=>{
    const [isSignup,setIsSignup] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);


    return (
        <LoginStateContext.Provider value={{isSignup,isAdmin,setIsAdmin,setIsSignup}}>
            {children}
        </LoginStateContext.Provider>
    )
}
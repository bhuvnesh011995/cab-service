import { createContext, useState } from "react";

const authContext = createContext()

const initialAdmin ={
    name:null,
    username:null,
    email:null,
    token:null
}

export default function AuthProvider({children}){

    const [admin,setAdmin] = useState(initialAdmin)
    return(
        <authContext.Provider value={{admin,setAdmin,initialAdmin}}>
            {children}
        </authContext.Provider>
    )
}

export {authContext}
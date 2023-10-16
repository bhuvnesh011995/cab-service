import { createContext, useState } from "react";

const authContext = createContext()

const initialAdmin ={
    name:null,
    username:null,
    email:null,
    token:null,
    role:null,
    permissions:null,
}

export default function AuthProvider({children}){

    const [admin,setAdmin] = useState(initialAdmin)
    console.log("xxxxxxxxxxxxxxxx",admin)
    return(
        <authContext.Provider value={{admin,setAdmin,initialAdmin}}>
            {children}
        </authContext.Provider>
    )
}

export {authContext}
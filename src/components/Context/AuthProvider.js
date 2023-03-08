import {useNavigate} from "react-router-dom";
import {auth} from "../../firebase/config";


import React, {createContext, useEffect, useState} from 'react'
import {Spin} from "antd";

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState({})
    const history = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
     const unSubscribe =  auth.onAuthStateChanged(user => {
         if(user){
                const {displayName, email, uid, photoURL} = user
                setUser({
                    displayName, email, uid, photoURL
                })
                setIsLoading(false)
                history('/')
            } else {
             setIsLoading(false)
             history('/login')
         }
        })
        return () => {
         unSubscribe()
        }
    },[history])
    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

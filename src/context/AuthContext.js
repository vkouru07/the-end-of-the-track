import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged, 
    getAuth, 
    signInAnonymously} from "firebase/auth";

import {auth} from "../firebase"; 

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }; 
    const logOut = () => {
        signOut (auth)
    };

    const anonymousSignin = () => {
        signInAnonymously(auth); 
    }


    useEffect (() => {
        const unsubscribe = onAuthStateChanged (auth, (currentuser) => {
            setUser(currentuser)
        })
        return () => {
            unsubscribe(); 
        }
    }, [])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, anonymousSignin}}>
            {children}
        </AuthContext.Provider>
    ); 
}

export const UserAuth = () => {
    return useContext(AuthContext)
}

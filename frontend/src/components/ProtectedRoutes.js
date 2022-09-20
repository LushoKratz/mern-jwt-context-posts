import { useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export function ProtectedRoute({children}){
    const {authorize, verifyAuth} = useUserAuth();
    
    verifyAuth();
    
    if(!authorize) { 
         <Navigate to='/signIn' />
         //return <Navigate to='/signIn' />
    }

    return <>{children}</>;
}
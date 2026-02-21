import { Navigate } from "react-router-dom"
import { useVerifyAuth } from "../auth/AuthContext"
import { useEffect } from "react"
import { PageLoader } from "../icon/icons"

export const RequireAuth:React.FC<{children:React.ReactNode}> = ({children})=>{
    const verifyAuth = useVerifyAuth()
    
    useEffect(()=>{
        verifyAuth?.verify()
    }, [])

    if(!verifyAuth?.authChecked)
        return <PageLoader color={"green"}/>
    
    return verifyAuth?.isAuthenticated? children :  <Navigate to="/login" replace />
}
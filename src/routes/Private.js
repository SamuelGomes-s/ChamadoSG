import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate } from "react-router-dom"
import LoginScreenLoading from "../components/Loading"

export default function Private({ children }) {
    const { signed, loadingScreen } = useContext(AuthContext)
    
    if(loadingScreen){
        return <LoginScreenLoading/>
    }

    if (!signed) {
        return <Navigate to={'/'} />
    }


    return children
}
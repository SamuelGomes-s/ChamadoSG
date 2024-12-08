import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate } from "react-router-dom"

export default function Private({ children }) {
    const { signed } = useContext(AuthContext)
    


    if (!signed) {
        return <Navigate to={'/'} />
    }


    return children
}
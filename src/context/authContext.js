import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "../services/firebaseConnection"
import { collection, doc, setDoc } from "firebase/firestore"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLogin, setIslogin] = useState(false)
    const [isLoadingLogin, setisLoadingLogin] = useState(false)

    async function handleFirebaseLogin(email, password, name) {
        setisLoadingLogin(true)

        if (isLogin) {
            await signIn(email, password)
        } else {
            await signUp(email, password, name)
        }

    }

    async function signIn(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success('Logado com sucesso')
            setisLoadingLogin(false)
            userLocalStorage()
        } catch (error) {
            toast.error(`Erro ao logar conta: ${error.message}`);
            setisLoadingLogin(false)
        }
    }
    async function signUp(email, password, name) {
        try {

            const userDoc = await createUserWithEmailAndPassword(auth, email, password)
            const userRef = doc(db, 'userCollection', `${userDoc.user.uid}`)
            await setDoc(userRef, {
                name: name,
                email: email,
                avatarUrl: null,
                createdAt: new Date()
            })

            let userData = {
                name: userDoc.user.displayName,
                email: email,
                avatarUrl: null,
                _uid: userDoc.user.uid
            }

            updateProfile(userDoc.user, {
                displayName: name,
            })
            setUser(userData)
            userLocalStorage(userData)
            toast.success('Conta criada com sucesso')
            setisLoadingLogin(false)

        } catch (error) {
            toast.error(`Erro ao criar conta: ${error.message}`);
            setisLoadingLogin(false)

        }
    }

    function userLocalStorage(data) {
        let local = localStorage.getItem('user') || null
        if (local) {
            //vai atualizar
            console.log(local)
        } else {
            let userData = JSON.stringify(data)
            localStorage.setItem('user', userData)
        }

    }

    return (
        <AuthContext.Provider
            value={{
                handleFirebaseLogin,
                isLogin,
                setIslogin,
                isLoadingLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
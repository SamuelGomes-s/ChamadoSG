import {
    createContext,
    useEffect,
    useState
} from "react"
import { toast } from "react-toastify"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth"
import {
    auth,
    db
} from "../services/firebaseConnection"
import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isLogin, setIslogin] = useState(true)
    const [isLoadingLogin, setisLoadingLogin] = useState(false)
    const [loadingScreen, setLoadingScren] = useState(true)

    const navigation = useNavigate()

    useEffect(() => {

        const unsubcribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //se possuir usuario logado
                try {
                    const docRef = doc(db, 'userCollection', `${user.uid}`)
                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        let userData = {
                            name: docSnap.data().name,
                            email: docSnap.data().email,
                            avatarUrl: docSnap.data().avatarUrl,
                            _uid: user.uid
                        }
                        setUser(userData)
                        userLocalStorage(userData)
                    }
                    setLoadingScren(false)
                    navigation('/home')

                } catch (error) {
                    console.log(error)
                }

            } else {
                // caso não possua
                setUser(null)
                userLocalStorage()
                setLoadingScren(false)

            }
        })
        return () => unsubcribe()
    }, [])


    async function handleFirebaseLogin(email, password, name) {
        setisLoadingLogin(true)

        if (isLogin) {
            await signIn(email, password)
        } else {
            await signUp(email, password, name)
        }

    }

    async function signIn(email, password) {
        setisLoadingLogin(true)

        try {
            const userLogged = await signInWithEmailAndPassword(auth, email, password)

            const docRef = doc(db, 'userCollection', `${userLogged.user.uid}`)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData = {
                    name: data?.name || 'Usuário sem nome',
                    email: data?.email || 'Email não disponível',
                    avatarUrl: data?.avatarUrl || null,
                    _uid: userLogged.user.uid,
                };
                setUser(userData);
                userLocalStorage(userData);
            }


            toast.success('Logado com sucesso')

            navigation('/home')
        } catch (error) {
            toast.error(`Erro ao logar conta: ${error.message}`);
        }
        finally {
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
            navigation('/home')


        } catch (error) {
            toast.error(`Erro ao criar conta: ${error.message}`);
            setisLoadingLogin(false)

        }
    }

    function userLocalStorage(data) {
        if (!data) {
            localStorage.removeItem('chamadosSG');
            return
        }
        let local = localStorage.getItem('chamadoSG') || null
        if (local) {
            //vai atualizar
            setUser(JSON.parse(local))
        } else {
            let userData = JSON.stringify(data)
            localStorage.setItem('chamadoSG', userData)
        }


    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                handleFirebaseLogin,
                isLogin,
                setIslogin,
                isLoadingLogin,
                loadingScreen
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
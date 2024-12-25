import {
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import {
    Container,
    Content,
    ContentProfile,
    SignOutArea,
    SignOutBTN,
    ContentImage,
    ProfileForm,
    Input,
    SubbmitBTN,
    LabelName,
    Image,
    FileInput,
    Icon
} from "./styles";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { AuthContext } from "../../context/authContext";
import avatar from '../../images/avatar.png'
import { LuFilePlus2 } from "react-icons/lu";
import { toast } from "react-toastify";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import {
    db,
    storage
} from "../../services/firebaseConnection";
import {
    getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Profile() {
    const {
        logOut,
        user,
        setUser,
        userLocalStorage
    } = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [newAvatar, setNewAvatar] = useState(null)
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    useEffect(() => {
        emailRef.current.value = user.email;
        nameRef.current.value = user.name;
    }, [user])

    async function handleSignOut() {
        await logOut()
    }

    function handleFile(event) {
        if (event.target.files[0]) {
            const img = event.target.files[0];
            if (img.type === 'image/jpeg' || img.type === 'image/png') {
                setAvatarUrl(img); // Salva o arquivo no estado.
                setNewAvatar(URL.createObjectURL(img)); // Para exibição no frontend.
            } else {
                toast.error("Envie uma imagem do tipo PNG ou JPEG.");
            }
        }
    }

    async function handleUpload(update) {
        const uploadRef = ref(storage, `images/${user._uid}/${avatarUrl.name}`); // Usar avatarUrl, que contém o arquivo.
        if (!avatarUrl) {
            toast.error("Selecione uma imagem válida para upload.");
            return;
        }
        try {
            // Faz o upload da imagem para o Firebase Storage
            const snapshot = await uploadBytes(uploadRef, avatarUrl);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            const docRef = doc(db, 'userCollection', user._uid);
            const name = nameRef.current.value;
            let data = { ...user, avatarUrl: downloadUrl };
            // Se verdadeiro atualize nome e imagem.
            if (update) {
                data.name = name;
                await updateDoc(docRef, { avatarUrl: downloadUrl, name });
                await updateProfile(user._uid, { photoURL: downloadUrl })
            } else {
                await updateDoc(docRef, { avatarUrl: downloadUrl });
            }
            setUser(data);
            userLocalStorage(data);
            toast.success(update ? 'Dados atualizados' : 'Foto atualizada');
        } catch (error) {
            toast.error(`Erro ao fazer upload: ${error.message}`);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const name = nameRef.current.value
        const docRef = doc(db, 'userCollection', user._uid)
        if (name !== '' && name !== user.name && newAvatar !== null) {
            //vai atualizar nome e foto.
            await handleUpload(true)
            return
        } else if (name == user.name && newAvatar !== null) {
            //vai atualizar somente a foto.
            await handleUpload(false)
            return
        } else {
            toast.warning('Nenhuma alteração detectada.');
        }
    }

    return (
        <Container>
            <Header />
            <Content>
                <Title text={'Perfil'}>
                    <VscAccount />
                </Title>
                <ContentProfile>
                    <ProfileForm onSubmit={handleSubmit}>
                        <ContentImage>
                            <FileInput
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={handleFile}
                            />
                            <Icon>
                                <LuFilePlus2 />
                            </Icon>
                            <Image
                                alt="Foto do usuario"
                                src={newAvatar || (user.avatarUrl !== 'null' ? avatarUrl : avatar)}
                            />
                        </ContentImage>
                        <LabelName>Nome:</LabelName>
                        <Input
                            ref={nameRef}
                            type="text"
                        />
                        <LabelName>Email:</LabelName>
                        <Input
                            type="text"
                            ref={emailRef}
                            disabled={true}
                        />
                        <SubbmitBTN>Salvar</SubbmitBTN>
                    </ProfileForm>
                </ContentProfile>
                <SignOutArea>
                    <SignOutBTN onClick={handleSignOut}> <CiLogout size={30} color={'#fff'} /> </SignOutBTN>
                </SignOutArea>
            </Content>
        </Container>
    );
}

export default Profile;

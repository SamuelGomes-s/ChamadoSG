import { useContext, useRef, useState } from "react";
import {
    ActionBTN,
    Container,
    Content,
    ContentTitle,
    Input,
    LoginForm,
    SubmitBTN,
    Subtitle,
    Title
} from "./styles";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";



function Login() {

    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)

    const { handleFirebaseLogin, isLogin, setIslogin, isLoadingLogin } = useContext(AuthContext)

    async function handleLogin(event) {
        event.preventDefault()
        //pegar o valor da referencia e coloca-los em variavel.
        let email = emailRef.current?.value || ''
        let name = nameRef.current?.value || ''
        let password = passwordRef.current?.value || ''


        if (!name && !isLogin) {
            nameRef.current?.focus()
            toast.warning('Preencha o campo do nome...')
            return
        }
        if (!email) {
            emailRef.current?.focus()
            toast.warning('Preencha o campo do email...')
            return

        }

        if (!password) {
            passwordRef.current?.focus()
            toast.warning('Preencha o campo da senha...')
            return
        }
        if (password.length < 6) {
            toast.warning('Senha deve possuir mais que 6 caracteres...')
            return
        }

        if (isLogin) {
            //Para logar
            await handleFirebaseLogin(email, password)
            return
        }

        //Para cadastrar
        await handleFirebaseLogin(email, password, name)

    }
    function signInOrSignUp() {
        setIslogin(!isLogin)
        handleRefs()
    }

    function handleRefs() {
        //Responsavel para limpar os campos
        if (isLogin) {
            emailRef.current.value = null;
            passwordRef.current.value = null;
            return
        }
        nameRef.current.value = null;
        emailRef.current.value = null;
        passwordRef.current.value = null;
    }

    return (
        <Container >
            <Content>
                <ContentTitle>
                    <Title textColor='#bffe2e' >
                        Chamados
                        <Title textColor='#D9D9D9'>
                            SG
                        </Title>
                    </Title>
                </ContentTitle>
                <Subtitle>
                    {isLogin ? 'Tela de login' : 'Tela de cadastro'}
                </Subtitle>
                <LoginForm onSubmit={handleLogin}>

                    {
                        !isLogin && (
                            <Input
                                ref={nameRef}
                                type="text"
                                placeholder="Nome"
                            />)
                    }

                    <Input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        ref={passwordRef}
                        type="password"
                        placeholder="Senha"
                    />
                    <SubmitBTN  disabled={isLoadingLogin}>
                        {isLogin ? 'Acessar' : 'Cadastrar'}
                    </SubmitBTN>
                </LoginForm>
                <ActionBTN type="button" disabled={isLoadingLogin} onClick={signInOrSignUp}>
                    {isLogin ? 'Criar uma conta' : 'Já possuo uma conta'}
                </ActionBTN>

            </Content>

        </Container>
    );
}

export default Login;

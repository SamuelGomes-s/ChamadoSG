import { AccessButton, Container, Content, ButtonText, ContentIMG, Image } from "./styles";
import { RxHome } from "react-icons/rx";
import { GrConfigure } from "react-icons/gr";
import { FiUserPlus } from "react-icons/fi";
import avatar from '../../images/avatar.png'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
export default function Header() {
    const { user } = useContext(AuthContext)

    return (
        <Container>
            <Content>
                <ContentIMG  >
                    <Image src={user.avatarUrl == 'null' ? avatar : user.avatarUrl} />
                </ContentIMG>
                <AccessButton to={'/home'}>
                    <RxHome size={25} />
                    <ButtonText>Chamados</ButtonText>

                </AccessButton>
                <AccessButton to={'/customers'}>
                    <FiUserPlus size={30} />
                    <ButtonText>Costumers</ButtonText>
                </AccessButton>
                <AccessButton to={'/profile'}>
                    <GrConfigure size={30} />
                    <ButtonText>Perfil</ButtonText>

                </AccessButton>
            </Content>
        </Container >
    )
}
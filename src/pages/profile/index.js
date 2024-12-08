import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container, Content } from "./styles";
import { VscAccount } from "react-icons/vsc";

function Profile() {
    return (
        <Container>
            <Header />
            <Content>
                <Title text={'Perfil'}>
                <VscAccount />
                </Title>
            </Content>
        </Container>


    );
}

export default Profile;

import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container, Content } from "./styles";
import { FaPersonCirclePlus } from "react-icons/fa6";

function Costumers() {
    

    return (
        <Container>
            <Header />
            <Content>
                <Title text={'Clientes'}>
                <FaPersonCirclePlus />
                </Title>
            </Content>
        </Container>


    );
}

export default Costumers;
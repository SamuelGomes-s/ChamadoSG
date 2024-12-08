import Header from "../../components/Header";
import Title from "../../components/Title";
import { Container, Content } from "./styles";
import { MdOutlineComputer } from "react-icons/md";

function Dashboard() {
    return (
        <Container>
            <Header />

            <Content>

                <Title text='Chamados'>
                    <MdOutlineComputer />
                </Title>



            </Content>
        </Container>


    );
}

export default Dashboard;

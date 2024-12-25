import {
    ActionBTN,
    AddOnText,
    Container,
    Content,
    ContentComplement,
    ContentRow,
    Info,
    Span
} from "./styles";
import { GoX } from "react-icons/go";

export default function Modal({ ticketData, visible }) {

    function handleVisible(event) {
        event.preventDefault()
        visible()
    }

    return (
        <Container>
            <Content>
                <ActionBTN onClick={handleVisible}>
                    <GoX size={25} color="#fff" />
                    Voltar
                </ActionBTN>
                <ContentRow>
                    <Span> Cliente:</Span> <Info>{ticketData.customer}</Info>
                </ContentRow>
                <ContentRow>
                    <Span> Assunto:</Span> <Info>{ticketData.topic}</Info>
                </ContentRow>
                <ContentRow>
                    <Span> Status:</Span> <Info>{ticketData.status}</Info>
                    <Span> Data de abertura:</Span> <Info>{ticketData.createdAtFormated}</Info>
                </ContentRow>
                <ContentComplement>
                    <Span>Complemento</Span>
                    {!ticketData.complement ? <AddOnText> Não possui dados adicionais...</AddOnText> : <AddOnText>
                        {ticketData.complement}
                    </AddOnText>}
                </ContentComplement>
            </Content>
        </Container>
    )

}
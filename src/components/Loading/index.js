import styled, { keyframes } from "styled-components";

export default function ScreenLoading() {

    return (
        <Container>
            <Content>
                <Text>Carregando ...</Text>
            </Content>
        </Container>
    )
}

const pulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: 100dvh;
    background-color: #4D4D4D;
`;

const Content = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
`

const Text = styled.span`
    font-size: 30px;
    color: #ffff;
    font-weight:bold;
    animation: ${pulse} 1.5s infinite;
`;

import styled from "styled-components"


export default function Title({ children, text }) {

    return (

        <Container>
            <>{children}</>
            <> {text}</>
        </Container>
    )

}

const Container = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 1em 1.7em;
    gap: 10px;
    border-radius: 5px;
    display: flex;
    align-items:center;
    color: #000;
    font-size: 22px;
    user-select: none;
`;



import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100dvh;
`;


const Content = styled.div`
    margin-left: 200px;
    padding: 1em;
    @media screen and (max-width:700px){
        margin-left: 0;
        width: 100%;
        height: auto;
        
    }

`;




export {
    Container,
    Content
}
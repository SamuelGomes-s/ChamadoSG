import styled, { keyframes } from "styled-components";

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

const ContainerForm = styled.div`
    margin-top: 1em;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    padding: 1.7em;
`;

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;    
    @media screen and (max-width:700px){
        width: 80%;
    }
`

const FormTickets = styled.form`
    display: flex;
    flex-direction: column;
`;

const TextArea = styled.textarea`
    background-color: #F0F0F0;
    width: 80%;
    height: 150px;
    padding: 0.7em;
    resize: none;
    &::placeholder{
        color: #000;
    }
    @media screen and (max-width:700px){
        width: 100%;
    }
`

const Label = styled.label`
    font-size: 20px;
    color: #000;
    padding: 0.3em 0;
`;

const Select = styled.select`
    font-size: 16px;
    max-width: 500px;
    padding: 5px;
    cursor: pointer;
    background-color: #F0F0F0;
    border-radius: 5px;
    &:focus{
        background-color: #d9d9d9;  
    }    
`;

const Span = styled.span`
    margin:0 5px;
    user-select: none;
    font-size: 20px;
`;
const Option = styled.option`
    color: #00008B;
    background-color: #FFF;
`

const ContentStatus = styled.div`
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    height: 50px; 
    @media screen and (max-width:700px){
        display: flex;
        flex-direction: column; 
        height: auto;
        gap: 5px;
        margin: 0.5rem 0;
    }
`;

const Radio = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #4682B4;
`;

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

const SubbmitBTN = styled.button`
    width: auto;
    height: 40px;
    margin-top: 15px;
    max-width: 500px;
    border: none;
    background-color: #4682B4;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    transition: all  0.5s;
    &:hover:not(:disabled){
        transform: scale(1.02);
        opacity: 0.8;
    }
    &:active:not(:disabled){
        transform: scale(1.07);
    }
    &:disabled{
        background-color:rgb(154, 226, 255);
        opacity: 0.8;
        color: #000
    }  
`;

const Loading = styled.div`
    user-select: none;
    height: 300px;
    display: flex;
    font-size: 40px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    animation: ${pulse} 1.5s infinite;
`;

export {
    Container,
    Content,
    ContainerForm,
    Label,
    Loading,
    TextArea,
    FormTickets,
    ContentForm,
    ContentStatus,
    Option,
    Select,
    Span,
    Radio,
    SubbmitBTN
}
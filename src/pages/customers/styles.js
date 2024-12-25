
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

const CustomerForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width:  700px;
`;

const Input = styled.input`
    width: 50%;
    background-color: #F0F0F0;
    border: 0;
    height: 40px;
    padding: 0 1em;
    border-radius: 5px;
    @media screen and (max-width:700px){
        width:80%;   
    }
`;

const SubbmitBTN = styled.button`
    width: 100px;
    height: 40px;
    margin-top: 15px;
    border: none;
    background-color: #4682B4;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    transition: all  0.5s;
    &:hover{
        transform: scale(1.02);
        opacity: 0.8;
    }
    &:active{
        transform: scale(1.07);
    }
    &:disabled{
        background-color: #d9d9d9;
        opacity: 0.8;
    }
`;

const ContentForm = styled.div`
    margin-top: 1em;
    width: 100%;
    background-color: #fff;
    padding: 1em;
    border-radius: 5px;
`;
const LabelName = styled.label`
    color:#000;
    margin: 15px 0;
`;

export {
    Container,
    Content,
    CustomerForm,
    Input,
    ContentForm,
    SubbmitBTN,
    LabelName
}
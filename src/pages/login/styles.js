import styled from "styled-components";

const Container = styled.div`
    height: 100vh;  
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    border: 1px solid #4D4D4D;
    min-width: 600px;
    border-radius: 5px;
    background-color: #F0F0F0;
    overflow:hidden;
`;

const Title = styled.span`
    font-size: 30px;
    color: ${props => props.textColor};
    font-weight:  bold;
`;

const ContentTitle = styled.div`
    background-color: #4682e4 ;
    border-top-right-radius:  4px;
    border-top-left-radius:  4px;
    width: 100%;
    font-family: 'Courier New', Courier, monospace;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    user-select: none;
`;

const Input = styled.input`
    margin-top: 10px;
    background-color: #FFF;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
`;

const LoginForm = styled.form`
    display:flex;
    width:  100%;
    padding: 1em;
    flex-direction: column;
`;

const SubmitBTN = styled.button`
    margin-top: 10px;
    border: none;
    background-color: #4682B4;
    height: 30px;
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
`;

const Subtitle = styled.span`
    font-size: 18px;
    font-weight: 500;
    padding-top: 1em;
`;

const ActionBTN = styled.button`
    margin-bottom: 2em;
    background-color: transparent;
    border: 0;
    &:hover{
        transform: scale(1.02);
        opacity: 0.8;
    }
    &:active{
        transform: scale(1.07);
    }
`;

export {
    Container,
    LoginForm,
    Input,
    Content,
    Title,
    SubmitBTN,
    ContentTitle,
    Subtitle,
    ActionBTN
}
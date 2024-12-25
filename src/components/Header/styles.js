import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 200px;
    height: 100%;
    background-color:#808080;
    @media screen and (max-width:700px){
        display: flex;
        position: relative;
        flex-direction: row;
        width: 100%;
        height: auto;
        background-color:#808080;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width:700px){
        display: flex;
        flex-direction: row;
    }
`;

const AccessButton = styled(Link)`
    display:  flex;
    align-items: center;
    height: 45px;
    padding: 15px 10px;
    gap: 10px;
    text-decoration: none;
    color: #fff;
    border: 0;
    transition: all 0.5ms;
    &:hover{
        background-color:#4682B4;
    }
    &:active{
        color: #ADD8E6;
    }
    
`
const ButtonText = styled.span`
    font-size: 18px; 
    font-weight: bold;   
`;

const ContentIMG = styled.div`
    height: 150px;
    background-color: #D9D9D9;  
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);   
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width:700px){
        display: none;    
    }
`;

const Image = styled.img`
    display: flex;
    position: relative;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    z-index: 99;
    object-fit: contain;
`;

export {
    Container,
    Content,
    AccessButton,
    ButtonText,
    ContentIMG,
    Image
}
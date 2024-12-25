import { Link } from "react-router-dom";
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

const TicketsContent = styled.div`
    margin-top: 1em;
    width: 100%;
    min-height: 300px;
    padding: 1em;
    background-color: #fff;
    border-radius: 5px;
`;

const TicketsTable = styled.table`
    width: 100%;
    height: auto;
    border-collapse: collapse;
    text-align: start;
    vertical-align: middle;
    @media screen and (max-width: 700px){
        border:0;
    }
`;

const TicketsThead = styled.thead`
    border: 1px solid #121212;
    @media screen and (max-width: 700px){
        border:none;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }    
`;
const TicketsTr = styled.tr`
    border-top: 1px solid #121212;
    @media screen and (max-width: 700px){
        border-bottom: 3px solid #DDD;
        display: block;
        margin-bottom: 0.60em;
    }
`
const TicketsTh = styled.th`
    border: 1px solid #121212;
    padding: 1rem;
    
`
const TicketsTd = styled.td`
    padding: 1rem;
    text-align: center;
    @media screen and (max-width: 700px){
        border-bottom: 1px solid #DDD;
        display: block;
        font-size: 0.8em;
        text-align: right
    }
`;

const TicketsTbody = styled.tbody``;

const ActionBTN = styled.button`
    margin-right: 10px;
    height: 35px;
    width: 35px;
    border: 0;
    background-color: ${props => props.$bgColor};
    transition: all 0.2s;
    border-radius: 5px;
    &:hover{
        transform: scale(1.1);
        opacity: 0.9
    }
`;


const TicketsCreateButton = styled(Link)`
    text-decoration: none;  
    background-color: #049b15;
    color: #fff;
    padding: 0.5rem;
    font-size: 22px;
    
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: ease-in-out 0.5s;
    &:hover{
        background-color: #58d166;
        color: #000;
        transform: scale(1.1);
        margin-right: 1.5rem;
    }
`;

const CreateTicketsArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    flex-direction: column;
`;

const AlertText = styled.span`
    padding: 1.5rem;
    font-size: 22px;
    font-weight: 600;
`;

const Loading = styled.div``;

const LoadMoreBtn = styled.button`
    text-decoration: none;  
    background-color: #00008B ;
    color: #fff;
    margin: 0.5em 0;
    padding: 0.5rem;
    font-size: 22px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    &:hover{
        opacity: 0.7;
        transform: scale(1.1);
        margin-left: 0.5rem;
    }&:disabled{
        background-color:#d9d9d9;
    }
`;


export {
    Container,
    Content,
    TicketsContent,
    TicketsTable,
    TicketsTd,
    TicketsThead,
    TicketsTr,
    TicketsTh,
    TicketsTbody,
    ActionBTN,
    TicketsCreateButton,
    CreateTicketsArea,
    AlertText,
    Loading,
    LoadMoreBtn,
}
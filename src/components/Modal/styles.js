import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 99;
`;

const Content = styled.div`
    position: fixed;
    top: 15%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 4em 2em;
    background-color: #f4f2f2;
    max-width: 600px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.8);
`;


const ContentRow = styled.div`
    padding:  0.5em 0;
`;

const Span = styled.span`
    color: #000;
    font-size: 20px;
    font-weight: 800;
`;

const Info = styled.i`
    color: #000;
    font-size: 20px;
    font-weight: 200;
    padding:  0  5px;
`;

const AddOnText = styled.p`
    padding:  0.5em;
    white-space: pre-wrap;
    line-height: 150%;
`;

const ContentComplement = styled.div`
`;

const ActionBTN = styled.button`
    position: absolute;
    top: 15px;
    left: 15px;
    border: 0;
    background-color: #f00500;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
      padding: 4px 15px;
    border-radius: 5px;
    &:hover{
        background-color: #f65835;
    }
`;


export {
    Container,
    Content,
    ContentRow,
    Span,
    Info,
    ContentComplement,
    AddOnText,
    ActionBTN
}
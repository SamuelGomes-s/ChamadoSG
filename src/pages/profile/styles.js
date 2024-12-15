import styled from "styled-components";

const Container = styled.div`
    width: 100% ;
    height: 100dvh;
 overflow: hidden;
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

const ContentProfile = styled.div`
    width: 100%;
    padding: 1em;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 5px;

`;

const SignOutArea = styled.div`
    display: flex;
    margin-top: 30px;
    align-items: center;
    width: 100%;
    padding: 1em;
    background-color: #fff;
    border-radius: 5px;
`;
const SignOutBTN = styled.button`
    width: 100px;
    height: 40px;

    border: none;
    background-color: #f00000;
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
const ContentImage = styled.div`
    display: inline-block;
    position: relative;
    z-index: 0;
    width: 200px;
    height: 200px;
`;

const Image = styled.img`
    height: 200px;
    width: 200px;
    object-fit:  contain;
    border-radius: 50%;
    display: block;
    z-index: 1;
`;

const FileInput = styled.input`
    position: absolute;   
    top: 0;
    left: 0;
    height: 200px;
    width: 200px;
    opacity: 0;  
    cursor: pointer;
    z-index: 1; 

`;
const Icon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3; 
    color: #ffffff;  
    font-size: 24px;  
    pointer-events: none;
`;

const ProfileForm = styled.form`
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
    &:disabled{
        opacity: 0.5;
        cursor: no-drop;
        &::placeholder{
            color:#000;
            font-weight: bold;
        }
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
`;
const LabelName = styled.label`
    color:#000;
    margin: 15px 0;
`;


export {
    Container,
    Content,
    ContentProfile,
    SignOutArea,
    SignOutBTN,
    ContentImage,
    ProfileForm,
    SubbmitBTN,
    Input,
    LabelName,
    Image,
    FileInput,
    Icon
}
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_login.jpg"
import React, { } from 'react';
import SignupForm from "../components/SignupForm/SignupForm";

export interface SignUpFormProps {

}

const SignUp: React.FC<SignUpFormProps> = () => {

    return (
        <MainContainer>
            <SignupForm />
        </MainContainer>
    );
}


const MainContainer = styled.div`
z-index:300;
display:flex;
background-image: url(${Background});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
height:100%;
min-height:100vh;
margin:auto;
`
export default SignUp;
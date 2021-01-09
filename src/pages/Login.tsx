import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_login.jpg"
import IsLoading from "../components/IsLoading/IsLoading";
import LoginForm from "../components/LoginForm/LoginForm";

export interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    return (
        <Container>
            {isLoading ? <IsLoading /> :
                <LoginForm />
            }
        </Container>
    );
}


const Container = styled.div`
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
export default Login; 
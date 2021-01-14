import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IsLoading from "../components/IsLoading/IsLoading";
import LoginForm from "../components/LoginForm/LoginForm";
import { storage } from "../firebase";

export interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        storage.ref('Images/Background/dnd_login.jpg').getDownloadURL().then((url: string) => setImageUrl(url))
    }, [])
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            {isLoading ? <IsLoading /> :
                <LoginForm />
            }
        </Container>
    );
}


const Container = styled.div`
z-index:300;
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover ;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
min-height:100vh;
margin:auto;
`
export default Login; 
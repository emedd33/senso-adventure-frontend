import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import SignupForm from "../components/SignupForm/SignupForm";
import { useSelector } from "react-redux";
import IsLoading from "../components/IsLoading/IsLoading";
import { storage } from "../firebase";

export interface SignUpFormProps {

}

const SignUp: React.FC<SignUpFormProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const [imageUrl, setImageUrl] = useState("")
    useEffect(() => {
        storage.ref('Images/Background/dnd_login.jpg').getDownloadURL().then((url: string) => setImageUrl(url))
    }, [])
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            {isLoading ? <IsLoading /> :
                <SignupForm />
            }
        </Container>
    );
}


const Container = styled.div`
z-index:300;
display:flex;
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
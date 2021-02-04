import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import ForgottenPasswordForm from "../../components/ForgottenPasswordForm/ForgottenPasswordForm";
import IsLoading from "../../components/IsLoading/IsLoading";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import { storage } from "../../firebase";

export interface LoginProps {}

const LoginIndex: React.FC<LoginProps> = () => {
  const isLoading = useSelector(
    (state: RootReducerProp) => state.admin.isLoading
  );
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    storage
      .ref("Images/Background/dnd_login.jpg")
      .getDownloadURL()
      .then((url: string) => setImageUrl(url));
  }, []);
  if (isLoading) {
    return (
      <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
        <IsLoading />
      </Container>
    );
  }
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/login/signup">
        <SignupForm />
      </Route>
      <Route exact path="/login/forgotten">
        <ForgottenPasswordForm />
      </Route>
    </Container>
  );
};

const Container = styled.div`
  z-index: 300;
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  width: 100%;
  min-height: 100vh;
  margin: auto;
`;
export default LoginIndex;

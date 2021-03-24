import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_BACKGROUND_IMAGE_STORAGE_PATH } from "../../assets/constants/Constants";
import ForgottenPasswordForm from "../../components/ForgottenPasswordForm/ForgottenPasswordForm";
import IsLoading from "../../components/IsLoading/IsLoading";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import { storage } from "../../services/Firebase/firebase";
import { getUrlFromStorage } from "../../services/Firebase/storage";
import { getAuthUser, getIsLoading } from "../../store/admin/adminSelectors";

export interface LoginProps { }

const LoginIndex: React.FC<LoginProps> = () => {
  const [imageUrl, setImageUrl] = useState("");
  const isLoading = useSelector(getIsLoading)
  const authUser = useSelector(getAuthUser)
  useEffect(() => {
    getUrlFromStorage(LOGIN_BACKGROUND_IMAGE_STORAGE_PATH)
      .then((url: string) => setImageUrl(url));
  }, []);
  if (authUser && authUser.user.displayName) {
    return <Redirect to="/" />
  }

  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      {isLoading ? <IsLoading />
        : <>

          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/login/signup">
            <SignupForm />
          </Route>
          <Route exact path="/login/forgotten">
            <ForgottenPasswordForm />
          </Route>
        </>
      }
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

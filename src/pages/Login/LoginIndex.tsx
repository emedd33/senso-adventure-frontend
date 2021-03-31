import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import ForgottenPasswordForm from "../../components/ForgottenPasswordForm/ForgottenPasswordForm";
import IsLoading from "../../components/IsLoading/IsLoading";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import { getAuthUser, getIsLoading } from "../../store/admin/adminSelectors";

export interface LoginProps { }

const LoginIndex: React.FC<LoginProps> = () => {
  const isLoading = useSelector(getIsLoading);
  const authUser = useSelector(getAuthUser);
  if (authUser && authUser.user.displayName) {
    return <Redirect to="/" />;
  }

  return (
    <Container style={{}}>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
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
      )}
    </Container>
  );
};

const Container = styled.div`
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  width: 100%;
  min-height: 100vh;
  margin: auto;
`;
export default LoginIndex;

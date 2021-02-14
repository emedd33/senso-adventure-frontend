import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "./Home";
import CampaignEdit from "../Campaign/CampaignEdit";
import { useDispatch, useSelector } from "react-redux";
import IsLoading from "../../components/IsLoading/IsLoading";
import { setBackgroundImageFromFirebase } from "../../store/selected/selectedCreators";

type HomeIndexProps = {};
const HomeIndex: FunctionComponent<HomeIndexProps> = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector(
    (state: RootReducerProp) => state.selected.backgroundImage
  );
  const authUser = useSelector(
    (state: RootReducerProp) => state.admin.authUser
  );
  const isLoading = useSelector(
    (state: RootReducerProp) => state.admin.isLoading
  );
  useEffect(() => {
    dispatch(setBackgroundImageFromFirebase("dnd_background.jpg"));
  }, [dispatch]);
  if (!authUser) {
    <Redirect to="/" />;
  }
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      <LeftGradientDiv style={{ left: 0 }} />
      <RightGradientDiv style={{ right: 0 }} />

      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <Route exact path="/editcampaign">
            <CampaignEdit />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </>
      )}
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
  height: 100%;
  min-height: 100vh;
`;

const LeftGradientDiv = styled.div`
  background: linear-gradient(to right, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;
const RightGradientDiv = styled.div`
  background: linear-gradient(to left, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;
export default HomeIndex;

import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "./Home";
import CampaignEdit from "../Campaign/CampaignEdit";
import { useDispatch, useSelector } from "react-redux";
import IsLoading from "../../components/IsLoading/IsLoading";
import { setBackgroundImageFromFirebase } from "../../store/selected/selectedCreators";
import { isDungeonMasterSelector } from "../../store/campaign/campaignSelectors";

type HomeIndexProps = {}
const HomeIndex: FunctionComponent<HomeIndexProps> = () => {
    const dispatch = useDispatch()
    const imageUrl = useSelector((state: RootReducerProp) => state.selected.backgroundImage)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    useEffect(() => {
        dispatch(setBackgroundImageFromFirebase("dnd_background.jpg"))
    }, [dispatch])
    if (!authUser) {
        <Redirect to="/" />
    }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            {
                isLoading ?
                    <IsLoading />
                    :
                    <>
                        <Route exact path="/editcampaign">
                            {isDungeonMaster ?
                                <CampaignEdit />
                                : <Redirect to={"/"} />
                            }
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </>
            }

        </Container >
    )


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
`
export default HomeIndex
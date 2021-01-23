import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import { storage } from "../../firebase";
import Home from "./Home";
import HomeCampaignEdit from "./HomeCampaignEdit";
import { useSelector } from "react-redux";
import IsLoading from "../../components/IsLoading/IsLoading";

type HomeIndexProps = {}
const HomeIndex: FunctionComponent<HomeIndexProps> = () => {
    const [imageUrl, setImageUrl] = useState("")
    const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    useEffect(() => {
        storage.ref('Images/Background/dnd_background.jpg').getDownloadURL()
            .then((url: string) => setImageUrl(url))
            .catch((e: any) => { console.log(e) })
    }, [])
    if (!authUser) {
        <Redirect to="/" />
    }
    if (isLoading) {
        return (
            <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
                <IsLoading />
            </Container>
        )
    }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            <Route exact path="/editcampaign">
                <HomeCampaignEdit />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>

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
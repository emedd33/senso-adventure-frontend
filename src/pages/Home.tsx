import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import sortByDateValue from "../utils/sortArrayDyDate";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.values(state.campaigns).map(campaign => Object.values(campaign.sessions)).flat()
    })
    const renderScrolls = () => {
        sortByDateValue(sessions)
        return Object.values(sessions).map((session: any,) => {
            switch (session.campaign) {
                case "curseOfStrahd":
                    return renderSplitScrolls(session, CosTitle)
                case "fireAndFury":
                    return renderSplitScrolls(session, "")
            }
        })
    }
    debugger
    return (
        <Container>
            <ScrollParentContainer>
                {sessions ?
                    renderScrolls()
                    : null
                }
                <div style={{ height: "100vh", width: "100%" }}>

                </div>
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
jusify-content: center;
background-image: url(${Background});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    padding-top:3rem;
    width:100%;
    height:100%;
    
`
export default Home
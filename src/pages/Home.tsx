import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.values(state.campaigns).map(campaign => Object.values(campaign.sessions)).flat()
    })
    const renderScrolls = () => {
        return Object.values(sessions).map((session: ISession,) => {
            return renderSplitScrolls(session, CosTitle)
        })
    }
    return (
        <Container>
            <ScrollParentContainer>
                {sessions ?
                    renderScrolls()
                    : null
                }
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
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
    background-color:black;
    
`
export default Home
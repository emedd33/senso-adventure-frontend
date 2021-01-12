import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import sortByDateValue from "../utils/sortArrayDyDate";
import IsLoading from "../components/IsLoading/IsLoading";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedCampaign } from "../store/selected/selectedCreators";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const campaigns = useSelector((state: RootReducerProp) => state.campaigns)
    const history = useHistory()
    const dispatch = useDispatch()
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.values(state.campaigns).map(campaign => Object.values(campaign.sessions)).flat()
    })
    const renderScrolls = () => {
        sortByDateValue(sessions)
        return Object.values(sessions).map((session: any,) => {
            switch (session.campaign) {
                case "curseOfStrahd":
                    return renderSplitScrolls(session, CosTitle, () => {
                        dispatch(dispatchSetSelectedCampaign(campaigns.curseOfStrahd.id))
                        history.push("/campaign")
                    }, false)

                case "fireAndFury":
                    return renderSplitScrolls(session, "", () => {
                        // dispatch(dispatchSetSelectedCampaign(campaigns.fireAndFury))
                        history.push("/campaign")
                    }, false)
                default:
                    return null
            }
        })
    }
    if (isLoading) {
        return (
            <Container>
                <IsLoading />
            </Container>
        )
    }
    return (
        <Container>
            {sessions ?
                renderScrolls()
                : null
            }
            <div style={{ height: "100vh", width: "100%" }}>

            </div>
        </Container >
    )


}

const Container = styled.div`
z-index:300;
display:flex;
background-image: url(${Background});
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
export default Home
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import sortByDateValue from "../utils/sortArrayDyDate";
import IsLoading from "../components/IsLoading/IsLoading";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedCampaign } from "../store/selected/selectedCreators";
import Scroll from "../components/Scroll/Scroll";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const campaigns = useSelector((state: RootReducerProp) => state.campaigns)
    const history = useHistory()
    const dispatch = useDispatch()
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.values(state.campaigns).map(campaign => campaign.sessions ? Object.values(campaign.sessions) : [])
            .flat()
    })
    const renderScrolls = () => {
        sortByDateValue(sessions)
        if (sessions.length > 0) {
            return Object.keys(sessions).map((key: any,) => {
                let story = sessions[key].story
                story = story.length > 1000 ? story.substring(0, 1000).concat("...") : story
                switch (sessions[key].campaign) {
                    case "curseOfStrahd":
                        return <Scroll id={sessions[key]} title={sessions[key].title} content={story} date={sessions[key].date} storyImage={CosTitle} isFirstScroll={true} campaign={sessions[key].campaign} onClick={() => {
                            dispatch(dispatchSetSelectedCampaign(campaigns.curseOfStrahd.id))
                            history.push("/campaign")
                        }}
                            isDungeonMaster={false} />

                    case "fireAndFury":
                        return <Scroll id={sessions[key]} title={sessions[key].title} content={sessions[key].story} date={sessions[key].date} storyImage={CosTitle} isFirstScroll={true} campaign={sessions[key].campaign} onClick={() => {
                            dispatch(dispatchSetSelectedCampaign(campaigns.fireAndFury.id))
                            history.push("/campaign")
                        }}
                            isDungeonMaster={false} />
                    default:
                        return null
                }
            })
        }
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
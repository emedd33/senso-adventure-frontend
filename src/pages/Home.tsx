import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import sortByDateValue from "../utils/sortArrayDyDate";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedCampaign, dispatchSetSelectedSession } from "../store/selected/selectedCreators";
import Scroll from "../components/Scroll/Scroll";
import { storage } from "../firebase";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const campaigns = useSelector((state: RootReducerProp) => state.campaigns)
    const [imageUrl, setImageUrl] = useState("")
    const [campaignTitles, setCampaingTitles] = useState({})
    const history = useHistory()
    const dispatch = useDispatch()
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.values(state.campaigns).map(campaign => campaign.sessions ? Object.values(campaign.sessions) : [])
            .flat()
    })

    useEffect(() => {
        storage.ref('Images/Background/dnd_background.jpg').getDownloadURL()
            .then((url: string) => setImageUrl(url))
            .catch((e: any) => { })
        storage.ref('Images/CampaignTitle').listAll()
            .then(res => {
                res.items.forEach(item => {
                    item.getMetadata().then(data => setCampaingTitles((titles) => { return { ...titles, title: data.name } }))
                })
            })
            .catch(e => console.log(e))
    }, [])

    const renderScrolls = () => {
        sortByDateValue(sessions)
        if (sessions.length > 0) {
            return Object.keys(sessions).map((key: any,) => {
                let story = sessions[key].story

                story = story.length > 1000 ? story.substring(0, 1000).concat("...") : story
                console.log(campaignTitles, sessions[key])
                return <Scroll key={key} id={sessions[key]} title={sessions[key].title} content={story} date={sessions[key].date} storyImage={CosTitle} isFirstScroll={true} campaign={sessions[key].campaign} onClick={() => {
                    dispatch(dispatchSetSelectedCampaign(campaigns.curseOfStrahd.id))
                    dispatch(dispatchSetSelectedSession({ id: key, session: sessions[key] }))
                    history.push("/campaign/session")
                }}
                />

            })
        }
    }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
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
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CosTitle from "../../assets/backgroundImage/CosTitle.png"
import sortByDateValue from "../../utils/sortArrayDyDate";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedCampaign, dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import Scroll from "../../components/Scroll/Scroll";
import { CampaignTitleImageFileLocation, storage } from "../../firebase";
import { getAllSessions } from "../../store/campaign/campaignSelectors";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const [, setCampaingTitles] = useState({})
    const history = useHistory()
    const dispatch = useDispatch()
    const sessions = useSelector(getAllSessions)
    useEffect(() => {

        storage.ref(CampaignTitleImageFileLocation).listAll()
            .then(res => {
                res.items.forEach(item => {
                    item.getMetadata().then(data => setCampaingTitles((titles) => { return { ...titles, title: data } }))
                })
            })
            .catch(e => console.log(e))
    }, [])

    const renderScrolls = () => {
        if (sessions) {

            sortByDateValue(sessions)
            return sessions.map((session: any,) => {
                console.log(session)

                return <Scroll key={session.session.sessionId} id={session.sessionId} title={session.session.title} content="" date={session.session.date} storyImage={CosTitle} isFirstScroll={true} campaign={session.campaignId} onClick={() => {
                    dispatch(dispatchSetSelectedCampaign(session.campaignId))
                    dispatch(dispatchSetSelectedSession({ id: session.sessionId, session: session.session }))
                    history.push("/campaign/session")
                }}
                />

            })

        }

    }
    return (
        <>
            {sessions ?
                renderScrolls()
                : null
            }
        </>
    )


}

export default Home
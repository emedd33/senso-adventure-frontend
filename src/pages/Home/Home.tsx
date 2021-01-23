import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CosTitle from "../../assets/backgroundImage/CosTitle.png"
import sortByDateValue from "../../utils/sortArrayDyDate";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedCampaign, dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import Scroll from "../../components/Scroll/Scroll";
import { storage } from "../../firebase";
import { setIsLoading } from "../../store/admin/adminCreator";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const [, setCampaingTitles] = useState({})
    const history = useHistory()
    const dispatch = useDispatch()
    const sessions = useSelector((state: RootReducerProp) => {
        return Object.entries(state.campaigns).map(([campaignId, campaign]) => {
            if (campaign.sessions) {
                return Object.entries(campaign.sessions).map(([sessionId, session]) => {
                    return {
                        "campaignId": campaignId,
                        "sessionId": sessionId,
                        "session": session
                    }
                })
            }
            return null
        }).flat()

    })
    useEffect(() => {
        dispatch(setIsLoading(true))
        storage.ref('Images/CampaignTitle').listAll()
            .then(res => {
                res.items.forEach(item => {
                    item.getMetadata().then(data => setCampaingTitles((titles) => { return { ...titles, title: data } }))
                })
            })
            .catch(e => console.log(e)).finally(() => dispatch(setIsLoading(false)))
    }, [dispatch])

    const renderScrolls = () => {
        sortByDateValue(sessions)
        return sessions.map((session: any,) => {
            if (session) {

                return <Scroll key={session.sessionId} id={session.sessionId} title={session.session.title} content="" date={session.session.date} storyImage={CosTitle} isFirstScroll={true} campaign={session.session.campaign} onClick={() => {
                    dispatch(dispatchSetSelectedCampaign(session.campaignId))
                    dispatch(dispatchSetSelectedSession({ id: session.sessionId, session: session.session }))
                    history.push("/campaign/session")
                }}
                />
            }
            return null

        })


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
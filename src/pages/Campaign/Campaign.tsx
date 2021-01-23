import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters"
import CosTitle from "../../assets/backgroundImage/CosTitle.png" // TODO: switch to firebase storrage 
import SpeedDials from "../../components/SpeedDials/SpeedDials";
import Scroll from "../../components/Scroll/Scroll";
import { Redirect, useHistory } from "react-router-dom";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { storage } from "../../firebase";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("")
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return selectedCampaign.dungeonMaster === username
        }
        return false
    })
    useEffect(() => {
        if (selectedCampaign && selectedCampaign.campaignBackgroundImageFile !== undefined) {
            storage.ref('Images/CampaignTitle/' + selectedCampaign.campaignTitleImageFile).getDownloadURL().then(url => {
                setCampaignTitleImage(url)
            }).catch(e => console.log(e))
        }

    }, [selectedCampaign])
    const renderScrolls = () => {
        if (selectedCampaign?.sessions) {
            return (Object.keys(selectedCampaign.sessions).map((key: any) => {
                let story = selectedCampaign.sessions[key].story
                story = story.length > 500 ? story.substring(0, 1000).concat("...") : story
                let title = selectedCampaign!.sessions[key].title
                let date = selectedCampaign!.sessions[key].date
                let campaign = selectedCampaign!.sessions[key].campaign
                return (
                    <Scroll
                        id={key}
                        title={selectedCampaign!.sessions[key].title}
                        content={story}
                        date={selectedCampaign!.sessions[key].date}
                        storyImage={CosTitle}
                        isFirstScroll={true}
                        campaign={selectedCampaign!.sessions[key].campaign}
                        onClick={() => {
                            dispatch(dispatchSetSelectedSession({
                                id: key,
                                session: {
                                    title: title,
                                    story: story,
                                    date: date,
                                    campaign: campaign
                                }
                            }))
                            history.push("/campaign/session")
                        }
                        }
                    />
                )
            })
            )
        }
    }
    if (!selectedCampaign.title) {
        return <Redirect to="/" />
    }
    return (<>
        {campaignTitleImage ? <img src={campaignTitleImage} alt="Campaign title" style={{ minWidth: "20rem", width: "40%", maxHeight: "30rem" }} /> : null}
        <Characters />
        {selectedCampaign ?
            renderScrolls()
            : null
        }
        {isDungeonMaster ?
            <SpeedDials />
            : null}
    </>
    )
}

export default Campaign
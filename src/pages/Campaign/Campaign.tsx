import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters"
import CosTitle from "../../assets/backgroundImage/CosTitle.png" // TODO: switch to firebase storrage 
import SpeedDials from "../../components/SpeedDials/SpeedDials";
import Scroll from "../../components/Scroll/Scroll";
import { Redirect, useHistory } from "react-router-dom";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { isDungeonMasterSelector } from "../../store/campaign/campaignSelectors";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)

    const renderScrolls = () => {
        if (selectedCampaign?.campaign.sessions) {
            return (Object.keys(selectedCampaign.campaign.sessions).map((key: any) => {
                let story = selectedCampaign.campaign.sessions[key].story
                story = story.length > 500 ? story.substring(0, 1000).concat("...") : story
                let title = selectedCampaign!.campaign.sessions[key].title
                let date = selectedCampaign!.campaign.sessions[key].date
                let campaign = selectedCampaign!.campaign.sessions[key].campaign
                return (
                    <Scroll
                        id={key}
                        title={selectedCampaign!.campaign.sessions[key].title}
                        content={story}
                        date={selectedCampaign!.campaign.sessions[key].date}
                        storyImage={CosTitle}
                        isFirstScroll={true}
                        campaign={selectedCampaign!.campaign.sessions[key].campaign}
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
    // console.log(selectedCampaign)
    if (!selectedCampaign.id) {
        return <Redirect to="/" />
    }
    return (<>
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
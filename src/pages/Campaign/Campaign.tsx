import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters"
import CosTitle from "../../assets/backgroundImage/CosTitle.png" // TODO: switch to firebase storrage 
import SpeedDials from "../../components/SpeedDials/SpeedDials";
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    const renderScrolls = () => {
        if (selectedCampaign?.sessions) {
            Object.keys(selectedCampaign.sessions).map((key: any) => {
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
        }
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
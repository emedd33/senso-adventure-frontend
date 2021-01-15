import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters"
import CosTitle from "../../assets/backgroundImage/CosTitle.png" // TODO: switch to firebase storrage 
import SpeedDials from "../../components/SpeedDials/SpeedDials";
import Scroll from "../../components/Scroll/Scroll";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
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
            return Object.keys(selectedCampaign.sessions).map((key: any) => {
                let story = selectedCampaign.sessions[key].story
                story = story.length > 500 ? story.substring(0, 1000).concat("...") : story
                return <Scroll id={key} title={selectedCampaign!.sessions[key].title} content={story} date={selectedCampaign!.sessions[key].date} storyImage={CosTitle} isFirstScroll={true} campaign={selectedCampaign!.sessions[key].campaign} onClick={null} isDungeonMaster={isDungeonMaster} />
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
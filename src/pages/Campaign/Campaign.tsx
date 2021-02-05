import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters";
import CosTitle from "../../assets/backgroundImage/CosTitle.png"; // TODO: switch to firebase storrage
import SpeedDials from "../../components/SpeedDials/SpeedDials";
import Scroll from "../../components/Scroll/Scroll";
import { Redirect, useHistory } from "react-router-dom";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { isDungeonMasterSelector } from "../../store/campaign/campaignSelectors";
import sortSessionsByDateValue from "../../utils/sortArrayDyDate";

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );
    const isDungeonMaster = useSelector(isDungeonMasterSelector);

    const renderScrolls = () => {
        if (selectedCampaign?.campaign.sessions) {
            // sortSessionsByDateValue(selectedCampaign.campaign.sessions);
            return Object.entries(selectedCampaign.campaign.sessions).map(([id, session], index) => {

                return (
                    <Scroll
                        id={id}
                        title={session.title}
                        subTitle={session.subTitle ? session.subTitle : ""}
                        date={session.date}
                        storyImage={CosTitle}
                        isFirstScroll={true}
                        campaign={session.campaign}
                        onClick={() => {
                            dispatch(
                                dispatchSetSelectedSession({
                                    id: id,
                                    index: index,
                                    session: {
                                        title: session.title,
                                        subTitle: session.subTitle,
                                        story: session.story,
                                        date: session.date,
                                        campaign: session.campaign,
                                        sessionDay: session.sessionDay,
                                    },
                                })
                            );
                            history.push("/campaign/session");
                        }}
                    />
                );
            })

            // return Object.keys(selectedCampaign.campaign.sessions).map(
            //     (key: any, index: number) => {
            //         let story = selectedCampaign.campaign.sessions[key].story;
            //         story =
            //             story.length > 500 ? story.substring(0, 1000).concat("...") : story;
            //         let title = selectedCampaign!.campaign.sessions[key].title;
            //         let date = selectedCampaign!.campaign.sessions[key].date;
            //         let sessionDay = selectedCampaign!.campaign.sessions[key].sessionDay;
            //         let campaign = selectedCampaign!.campaign.sessions[key].campaign;
            //         let subTitle = selectedCampaign!.campaign.sessions[key].subTitle;
            //         return (
            //             <Scroll
            //                 id={key}
            //                 title={selectedCampaign!.campaign.sessions[key].title}
            //                 subTitle={selectedCampaign!.campaign.subTitle}
            //                 date={selectedCampaign!.campaign.sessions[key].date}
            //                 storyImage={CosTitle}
            //                 isFirstScroll={true}
            //                 campaign={selectedCampaign!.campaign.sessions[key].campaign}
            //                 onClick={() => {
            //                     dispatch(
            //                         dispatchSetSelectedSession({
            //                             id: key,
            //                             index: index,
            //                             session: {
            //                                 title: title,
            //                                 subTitle: subTitle,
            //                                 story: story,
            //                                 date: date,
            //                                 campaign: campaign,
            //                                 sessionDay: sessionDay,
            //                             },
            //                         })
            //                     );
            //                     history.push("/campaign/session");
            //                 }}
            //             />
            //         );
            //     });
        }
    };
    if (!selectedCampaign.id) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <Characters />
            <div style={{ width: "50%" }}>
                {selectedCampaign ? renderScrolls() : null}
            </div>
            {isDungeonMaster ? <SpeedDials /> : null}
        </>
    );
};

export default Campaign;

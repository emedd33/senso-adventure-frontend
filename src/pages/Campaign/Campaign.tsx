import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Characters from "../../components/Characters/Characters";
import CosTitle from "../../assets/backgroundImage/CosTitle.png"; // TODO: switch to firebase storrage
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );

    const renderScrolls = () => {
        if (selectedCampaign?.campaign.sessions) {
            return Object.entries(selectedCampaign.campaign.sessions).map(
                ([id, session], index) => {
                    return (
                        <Scroll
                            id={id}
                            title={session.title}
                            subTitle={session.subTitle ? session.subTitle : ""}
                            date={session.date}
                            storyImage={CosTitle}
                            campaign={session.campaign}
                            sessionDay={session.sessionDay}
                            onClick={() => {
                                dispatch(
                                    dispatchSetSelectedSession({
                                        id: id,
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
                }
            );
        }
    };
    return (
        <>
            <Characters />
            <div style={{ width: "50%", minWidth: "20rem" }}>
                {selectedCampaign ? renderScrolls() : null}
            </div>
        </>
    );
};

export default Campaign;

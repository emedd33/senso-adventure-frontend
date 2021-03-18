import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSelectedCampaign, getSelectedCampaignSessions } from "../../store/selected/selectedSelectors";

import Scroll from "../../components/Scroll/Scroll";
import { setSelectedSession } from "../../store/selected/selectedCreators";

type CampaignSessionsProps = {};
const CampaignSessions: FunctionComponent<CampaignSessionsProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessions = useSelector(getSelectedCampaignSessions);
    const selectedCampaign = useSelector(getSelectedCampaign)
    return (
        <>
            {sessions && selectedCampaign ? sessions.map(
                ([id, session]: [string, ISession], index: number) => {
                    return (
                        <div key={index}>

                            <Scroll
                                title={session.title}
                                subTitle={session.subTitle ? session.subTitle : ""}
                                date={session.date}
                                campaignSlug={selectedCampaign.campaign.slug}
                                sessionDay={session.sessionDay}
                                isOpaque={session.isPublished === "FALSE"}
                                onClick={() => {
                                    dispatch(setSelectedSession({ id: id, session: session }));
                                    history.push(
                                        `/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                                    );
                                }}
                            />
                        </div>
                    );
                }
            )
                : null}
        </>
    );
};

export default CampaignSessions;

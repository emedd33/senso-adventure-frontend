import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSelectedCampaign } from "../../store/selected/selectedSelectors";

import Scroll from "../../components/Scroll/Scroll";
import { setSelectedSession } from "../../store/selected/selectedCreators";

type CampaignSessionsProps = {};
const CampaignSessions: FunctionComponent<CampaignSessionsProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(getSelectedCampaign);

    return (
        <>
            {selectedCampaign && selectedCampaign.campaign.sessions
                ? Object.entries(selectedCampaign.campaign.sessions).map(
                    ([id, session]: [string, ISession]) => {
                        return (
                            <Scroll
                                id={id}
                                title={session.title}
                                subTitle={session.subTitle ? session.subTitle : ""}
                                date={session.date}
                                campaignSlug={session.slug}
                                sessionDay={session.sessionDay}
                                isOpaque={session.isPublished === "FALSE"}
                                onClick={() => {
                                    dispatch(setSelectedSession({ id: id, session: session }));
                                    history.push(
                                        `/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                                    );
                                }}
                            />
                        );
                    }
                )
                : null}
        </>
    );
};

export default CampaignSessions;

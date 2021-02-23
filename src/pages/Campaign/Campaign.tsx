import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import CosTitle from "../../assets/backgroundImage/CosTitle.png"; // TODO: switch to firebase storrage
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { getSelectedCampaign } from "../../store/selected/selectedSelectors";

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedCampaign = useSelector(getSelectedCampaign);

    return (
        <>
            {/* <Characters /> */}
            <div style={{ width: "50%", minWidth: "20rem" }}>
                {selectedCampaign && selectedCampaign.campaign.sessions ?
                    Object.entries(selectedCampaign.campaign.sessions).map(
                        ([id, session],) => {
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
                                        history.push(`/${selectedCampaign.campaign.slug}/${session.slug}`);
                                    }}
                                />
                            );
                        }
                    ) :
                    null}
            </div>
        </>
    );
};

export default Campaign;

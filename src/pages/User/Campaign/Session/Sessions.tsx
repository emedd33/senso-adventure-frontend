import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getSelectedCampaign,
  getSelectedCampaignSessions,
} from "../../../../store/selected/selectedSelectors";

import { setSelectedSession } from "../../../../store/selected/selectedCreators";
import useOwner from "../../../../store/hooks/useOwner";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Scroll from "../../../../components/Scroll/Scroll";

type CampaignSessionsProps = {};
const CampaignSessions: FunctionComponent<CampaignSessionsProps> = () => {
  const history = useHistory();
  const translate = useTranslation()
  const dispatch = useDispatch();
  const sessions = useSelector(getSelectedCampaignSessions);
  const selectedCampaign = useSelector(getSelectedCampaign);
  const owner = useOwner();
  return (
    <Container>

    {selectedCampaign
        ? <div style={{display:"grid", gridTemplateColumns:"1fr", justifyItems:"center"}}>

      <Link to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-session/`} style={{textDecoration:"none"}}>
        <Button variant="contained" color="primary" style={{textTransform:"none"}}>
          {translate.t('New session')}
        </Button>
      </Link>
      {sessions 
        ? sessions.map(([id, session]: [string, ISession], index: number) => {
            return (
                <Scroll
                  title={session.title}
                  subTitle={session.subTitle ? session.subTitle : ""}
                  date={session.date}
                  campaignSlug={selectedCampaign.campaign.slug}
                  sessionDay={session.sessionDay}
                  isOpaque={session.isPublished === "FALSE"}
                  owner={owner}
                  onClick={() => {
                    dispatch(setSelectedSession({ id: id, session: session }));
                    history.push(
                      `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                    );
                  }}
                />
            );
          })
        : null}
        </div>
    :null}
    </Container>

  );
}; 
const Container = styled.div`
  width: 70%;
  padding: 1rem;
  display: grid;
`;
export default CampaignSessions;

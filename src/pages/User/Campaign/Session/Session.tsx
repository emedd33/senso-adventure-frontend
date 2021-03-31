import React, { FunctionComponent, } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import {
    getNextSession,
    getPreviousSession,
} from "../../../../store/campaign/campaignSelectors";

import {
    getSelectedCampaign,
    getSelectedSession,
    getSelectedSessionStoragePath,
    isDungeonMasterSelector,
} from "../../../../store/selected/selectedSelectors";
import useOwner from "../../../../store/hooks/useOwner";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
import { useTranslation } from "react-i18next";
import { renderDate } from "../../../../utils/StringProcessing";

type CampaignSessionProps = {};
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    const history = useHistory();
    const translate = useTranslation()
    const location = useLocation()
    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const nextSession = useSelector(getNextSession);
    const owner = useOwner();
    const selectedSessionStoragePath = useSelector(getSelectedSessionStoragePath);
    const previousSession = useSelector(getPreviousSession);
    return (
        <>
            <Container>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        width: "100%",
                    }}
                >
                    <ChangeSessionButton
                        style={!previousSession ? { opacity: 0.6, cursor: "default" } : {}}
                        onClick={() => history.push(`${previousSession?.session.slug}`)}
                    >
                        {translate.t(`Previous`)}
                    </ChangeSessionButton>
                    <ChangeSessionButton
                        style={!nextSession ? { opacity: 0.6, cursor: "default" } : {}}
                        onClick={() => history.push(`${nextSession?.session.slug}`)}
                    >
                        {translate.t(`Next`)}
                    </ChangeSessionButton>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.5rem",
                                opacity: 0.8,
                                textAlign: "left",
                                margin: 0,
                            }}
                        >
                            {translate.t(`Session number`)}: {selectedSession?.session.sessionDay}
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                opacity: 0.5,
                                textAlign: "left",
                                margin: 0,
                            }}
                        >
                            {renderDate(selectedSession?.session.date, translate, " ")}
                        </p>
                    </div>
                    {isDungeonMaster ? (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                if (selectedCampaign && selectedSession) {
                                    history.push(
                                        `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/sessions/${selectedSession.session.slug}/edit`
                                    );
                                }
                            }}
                        >
                            {translate.t(`Edit`)}
                        </Button>
                    ) : null}
                </div>
                <h2 style={{ fontSize: "3rem", textAlign: "center" }}>
                    {selectedSession?.session.title}{" "}
                    {selectedSession?.session.isPublished === "FALSE"
                        ? `(${translate.t(`Not published`)})`
                        : null}
                </h2>
                <h3 style={{ fontSize: "2rem", textAlign: "center", opacity: 0.5 }}>
                    {selectedSession?.session.subTitle}
                </h3>
                {selectedSession ? (
                    <div onDoubleClick={() => {
                        if (isDungeonMaster) {
                            history.push(`${location.pathname}/edit`)
                        }
                    }} style={{ width: "100%" }}>

                        <SensoDraftJS
                            isDungeonMaster={isDungeonMaster}
                            readOnly={true}
                            storagePath={`${selectedSessionStoragePath}`}
                        />
                    </div>
                ) : null}
            </Container>
        </>
    );
};
const Container = styled.div`
  min-height: 20rem;
  min-width: 15rem;
  width: 90%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
`;
const ChangeSessionButton = styled.h4`
  color: black;
  margin: 0;
  cursor: pointer;
`;
export default CampaignSession;

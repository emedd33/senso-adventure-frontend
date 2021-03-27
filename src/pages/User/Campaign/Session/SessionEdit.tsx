
import React from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import "react-markdown-editor-lite/lib/index.css";
import styled from "styled-components";

import {
    getSelectedCampaign,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignLocationMentionList,
    getSelectedSession,
    getSelectedSessionStoragePath,
    isDungeonMasterSelector,
    getSelectedCampaignPlayerMentionList,
    getSelectedSessionDatabasePath
} from "../../../../store/selected/selectedSelectors";
import DraftJSEditor from "../../../../components/DraftJSEditor/DraftJSEditor";
import { SensoDateInput, SensoDelete, SensoImageInput, SensoNumberInput, SensoSwitch, SensoTextInput } from "../../../../components/SensoInputs";



const SessionEdit: React.FC = () => {
    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign)


    const isDungeonMaster = useSelector(isDungeonMasterSelector)

    const selectedSessionDatabasePath = useSelector(getSelectedSessionDatabasePath)
    const selectedSessionStoragePath = useSelector(getSelectedSessionStoragePath);


    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList)

    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList)
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList)



    if (!selectedSession || !selectedCampaign) {
        return <IsLoading />;
    }
    return (
        <div
            style={{
                marginBottom: "10rem",
                width: "80%",
                backgroundColor: OLD_WHITE,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                padding: "1rem",
                flexDirection: "column",
            }}
        >
            <TitleContainer>
                <h2 style={{ gridColumn: "1/3" }}>{selectedSession.session.title}</h2>
                <SensoDateInput
                    initValue={selectedSession.session.date}
                    firebasePath={`${selectedSessionDatabasePath}/date`}
                    label={"Date"}
                />
                <SensoSwitch
                    initValue={selectedSession.session.isPublished}
                    firebasePath={`${selectedSessionDatabasePath}/isPublished`}
                    label={"Publish"}
                />
                <SensoNumberInput
                    initValue={selectedSession.session.sessionDay}
                    firebasePath={`${selectedSessionDatabasePath}/sessionDay`}
                    label={"Session day"}
                    isNegativeValid={false}
                />
                <SensoTextInput
                    initValue={selectedSession.session.subTitle}
                    firebasePath={`${selectedSessionDatabasePath}/subTitle`}
                    label={"Subtitle"}
                />

            </TitleContainer>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>Session story</h1>
            </div>
            <DraftJSEditor
                isDungeonMaster={isDungeonMaster}
                monsterMentionList={monsterMentionList}
                playerMentionList={playerMentionList}
                locationMentionList={locationMentionList}
                readOnly={false}
                storagePath={`${selectedSessionStoragePath}/SessionStory.json`}
            />

            <h1>Session Images</h1>

            <SensoImageInput
                style={{ width: "100%" }}
                storagePath={`${selectedSessionStoragePath}/SessionImages`}
            />
            <SensoDelete
                storagePath={`${selectedSessionStoragePath}`}
                databasePath={`${selectedSessionDatabasePath}`}
                instanceType="Session"
                linkPath={`/${selectedCampaign.campaign.slug}/sessions`}
            />
        </div>
    );
};

const TitleContainer = styled.div`
  min-width: 15rem;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:0.5rem;
  margin-bottom: 2rem;
  `



export default SessionEdit;
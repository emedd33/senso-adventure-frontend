import React from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import "react-markdown-editor-lite/lib/index.css";
import styled from "styled-components";

import {
    getSelectedCampaign,
    getSelectedSession,
    getSelectedSessionStoragePath,
    isDungeonMasterSelector,
    getSelectedSessionDatabasePath,
} from "../../../../store/selected/selectedSelectors";
import {
    SensoDateInput,
    SensoDelete,
    SensoNumberInput,
    SensoSwitch,
    SensoTextInput,
} from "../../../../components/SensoInputs";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
import { useTranslation } from "react-i18next";

const SessionEdit: React.FC = () => {
    const translate = useTranslation()
    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign);

    const isDungeonMaster = useSelector(isDungeonMasterSelector);

    const selectedSessionDatabasePath = useSelector(
        getSelectedSessionDatabasePath
    );
    const selectedSessionStoragePath = useSelector(getSelectedSessionStoragePath);

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
                    label={translate.t(`Date`)}
                />
                <SensoSwitch
                    initValue={selectedSession.session.isPublished}
                    firebasePath={`${selectedSessionDatabasePath}/isPublished`}
                    label={`${translate.t(`Is published`)}`}
                    toolTip={translate.t(
                        `Published means that it's visible for other users`
                    )}
                />
                <SensoNumberInput
                    initValue={selectedSession.session.sessionDay}
                    firebasePath={`${selectedSessionDatabasePath}/sessionDay`}
                    label={translate.t(`Session number`)}
                    isNegativeValid={false}
                />
                <SensoTextInput
                    initValue={selectedSession.session.subTitle}
                    firebasePath={`${selectedSessionDatabasePath}/subTitle`}
                    label={translate.t(`Subtitle`)}
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
                <h1 style={{ flex: 2, textAlign: "center" }}>{translate.t(`The story`)}</h1>
            </div>
            <SensoDraftJS
                isDungeonMaster={isDungeonMaster}
                readOnly={false}
                storagePath={`${selectedSessionStoragePath}`}
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
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export default SessionEdit;

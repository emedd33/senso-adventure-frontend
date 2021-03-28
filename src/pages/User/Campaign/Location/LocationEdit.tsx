import { Divider } from "@material-ui/core";

import React from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import "react-markdown-editor-lite/lib/index.css";
import {
    SensoAccordianInput,
    SensoMultilineTextInput,
    SensoSwitch,
    SensoTextArrayInput,
    SensoTextInput,
    SensoDelete,
} from "../../../../components/SensoInputs";
import {
    getSelectedCampaign,
    getSelectedCampaignMonsters,
    getSelectedLocationStoragePath,
    isDungeonMasterSelector,
    getSelectedLocationDatabasePath,
} from "../../../../store/selected/selectedSelectors";
import { getIsLoading } from "../../../../store/admin/adminSelectors";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";

const CampaignLocationEdit: React.FC = () => {
    const selectedLocation = useSelector(
        (state: RootReducerProp) => state.selected.selectedLocation
    );
    const selectedCampaign = useSelector(getSelectedCampaign);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const isLoading = useSelector(getIsLoading);
    const CampaignMonsters = useSelector(getSelectedCampaignMonsters);
    const selectedLocationStoragePath = useSelector(
        getSelectedLocationStoragePath
    );
    const selectedLocationDatabasePath = useSelector(
        getSelectedLocationDatabasePath
    );

    if (isLoading || !selectedLocation || !selectedCampaign) {
        return <IsLoading />;
    }
    return (
        <div
            style={{
                marginBottom: "10rem",
                width: "90%",
                zIndex: 100,
                backgroundColor: OLD_WHITE,
                alignItems: "center",
                justifyItems: "start",
                padding: "1rem",
                display: "grid",
                gridTemplate: "1fr",
                gap: "0.5rem",
            }}
        >
            <h1 style={{ width: "100%", textAlign: "center" }}>
                {selectedLocation.location.name}
            </h1>
            <SensoSwitch
                firebasePath={`${selectedLocationDatabasePath}/isPublished`}
                initValue={selectedLocation.location.isPublished}
                label={"Publish"}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            />

            <SensoTextArrayInput
                firebasePath={`${selectedLocationDatabasePath}/nickNames`}
                initArray={selectedLocation.location.nickNames}
                label={"Also known as"}
            />
            <div style={{ width: "100%", margin: "1rem" }}>
                <Divider />
            </div>

            <SensoTextInput
                firebasePath={`${selectedLocationDatabasePath}/religion`}
                initValue={selectedLocation.location.religion}
                label={"Religion/belief"}
            />

            <SensoTextInput
                firebasePath={`${selectedLocationDatabasePath}/governRule`}
                initValue={selectedLocation.location.governRule}
                label={"Govern rule"}
            />
            <SensoMultilineTextInput
                firebasePath={`${selectedLocationDatabasePath}/description`}
                initValue={selectedLocation.location.description}
                rows={4}
                style={{ width: "100%" }}
                label={"Description"}
            />
            <Divider style={{ width: "100%", margin: "1rem" }} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>
                    {`Characters in ${selectedLocation.location.name}`}{" "}
                </h1>
            </div>

            <SensoAccordianInput
                firebasePath={`${selectedLocationDatabasePath}/characters`}
                initArray={selectedLocation.location.characters}
                choices={
                    CampaignMonsters
                        ? CampaignMonsters.map(([, character]: [string, IMonster]) => ({
                            title: character.name,
                            content: character,
                        }))
                        : []
                }
                label={"Characters"}
                style={{ width: "100%" }}
            />

            <Divider style={{ width: "100%", margin: "1rem" }} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>
                    {`Resources in ${selectedLocation.location.name}`}{" "}
                </h1>
            </div>

            <SensoAccordianInput
                firebasePath={`${selectedLocationDatabasePath}/resources`}
                initArray={selectedLocation.location.resources}
                label={"Resources"}
                style={{ width: "100%" }}
            />

            <Divider style={{ width: "100%", margin: "1rem" }} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>
                    {`Key Elements in ${selectedLocation.location.name}`}{" "}
                </h1>
            </div>

            <SensoAccordianInput
                firebasePath={`${selectedLocationDatabasePath}/keyElements`}
                initArray={selectedLocation.location.keyElements}
                label={"Key elements"}
                style={{ width: "100%" }}
            />

            <h1 style={{ flex: 2, textAlign: "center" }}>Lore and history</h1>
            <SensoDraftJS
                readOnly={false}
                isDungeonMaster={isDungeonMaster}
                storagePath={`${selectedLocationStoragePath}/locationLore.json`}
            />

            <SensoDelete
                storagePath={`${selectedLocationStoragePath}`}
                databasePath={`${selectedLocationDatabasePath}`}
                instanceType="Location"
                linkPath={`/${selectedCampaign.campaign.slug}/locations`}
            />
        </div>
    );
};

export default CampaignLocationEdit;

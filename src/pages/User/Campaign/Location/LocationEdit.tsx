import { Divider } from "@material-ui/core";

import React from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";

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
import { useTranslation } from "react-i18next";
import { useImageFile } from "../../../../store/hooks/useImageFile";
import ImageUpload from "../../../../components/ImageUpload/ImageUpload";
import useOwner from "../../../../store/hooks/useOwner";

const CampaignLocationEdit: React.FC = () => {
    const translate = useTranslation()
    const selectedLocation = useSelector(
        (state: RootReducerProp) => state.selected.selectedLocation
    );
    const [
        locationImage,
        setLocationImage,
    ] = useImageFile("LocationImage");
    const selectedCampaign = useSelector(getSelectedCampaign);
    const owner = useOwner()
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
            <ImageUpload
                imageFile={locationImage.file}
                setImageFile={setLocationImage}
                imageUploadPath={`users/${owner}/campaigns/${selectedCampaign?.campaign.slug}/locations/${selectedLocation?.location.slug}/LocationImage`}
                maxFiles={1}
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
                label={translate.t(`Govern rule`)}
            />
            <SensoMultilineTextInput
                firebasePath={`${selectedLocationDatabasePath}/description`}
                initValue={selectedLocation.location.description}
                rows={4}
                style={{ width: "100%" }}
                label={translate.t(`Description`)}
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
                    {`${translate.t(`Characters in`)} ${selectedLocation.location.name}`}{" "}
                </h1>
            </div>

            <SensoAccordianInput
                firebasePath={`${selectedLocationDatabasePath}/characters`}
                initArray={selectedLocation.location.characters}
                detailLabel={`${translate.t(`Role in`)} ${selectedLocation.location.name}`}
                allowStrings={true}
                choices={
                    CampaignMonsters
                        ? CampaignMonsters.map(([, character]: [string, IMonster]) => ({
                            title: character.name,
                            content: character,
                        }))
                        : []
                }
                label={translate.t(`Characters`)}
                style={{ width: "100%" }}
            />




            <h1 style={{ flex: 2, textAlign: "center" }}>{translate.t(`Notes`)}</h1>
            <SensoDraftJS
                readOnly={false}
                isDungeonMaster={isDungeonMaster}
                storagePath={`${selectedLocationStoragePath}`}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>

                <SensoDelete
                    storagePath={`${selectedLocationStoragePath}`}
                    databasePath={`${selectedLocationDatabasePath}`}
                    instanceType="Location"
                    linkPath={`/${selectedCampaign.campaign.slug}/locations`}
                />
            </div>
        </div>
    );
};

export default CampaignLocationEdit;

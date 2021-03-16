import {
    Divider,
} from "@material-ui/core";

import React from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import "react-markdown-editor-lite/lib/index.css";
import { SensoAccordianInput, SensoImageInput, SensoMultilineTextInput, SensoSwitch, SensoTextArrayInput, SensoTextInput } from "../../components/SensoInputs"
import {
    getSelectedCampaign,
    getSelectedCampaignCharacterMentionList,
    getSelectedCampaignCharacters,
    getSelectedCampaignLocationMentionList,
    getSelectedLocationStorageRef,
} from "../../store/selected/selectedSelectors";
import { getIsLoading } from "../../store/admin/adminSelectors";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";


const CampaignLocationEdit: React.FC = () => {
    const selectedLocation = useSelector(
        (state: RootReducerProp) => state.selected.selectedLocation
    );
    const selectedCampaign = useSelector(getSelectedCampaign);

    const isLoading = useSelector(getIsLoading);
    const storageRef = useSelector(getSelectedLocationStorageRef);
    const campaignCharacters = useSelector(getSelectedCampaignCharacters)


    const characterMentionList = useSelector(getSelectedCampaignCharacterMentionList)
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList);


    if (isLoading || !selectedLocation || !selectedCampaign) {
        return <IsLoading />;
    }
    return (
        <div
            style={{
                marginBottom: "10rem",
                width: "70%",
                backgroundColor: OLD_WHITE,
                alignItems: "center",
                justifyItems: "start",
                padding: "1rem",
                display: "grid",
                gridTemplate: "1fr",
                gap: "0.5rem",
            }}
        >
            <h1 style={{ width: "100%", textAlign: "center" }}>{selectedLocation.location.name}</h1>
            <SensoSwitch
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/isPublished`}
                initValue={selectedLocation.location.isPublished}
                label={"Publish"}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            />



            <SensoTextArrayInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/nickNames`}
                initArray={selectedLocation.location.nickNames}
                label={"Also known as"}
            />
            <div style={{ width: "100%", margin: "1rem" }}>

                <Divider />
            </div>


            <SensoTextInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/religion`}
                initValue={selectedLocation.location.religion}
                label={"Religion/belief"}
            />


            <SensoTextInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/governRule`}
                initValue={selectedLocation.location.governRule}
                label={"Govern rule"}
            />
            <SensoMultilineTextInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/summary`}
                initValue={selectedLocation.location.summary}
                rows={4}
                style={{ width: "100%" }}
                label={"Summary"}
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
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Characters in ${selectedLocation.location.name}`} </h1>
            </div>


            <SensoAccordianInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/characters`}
                initArray={selectedLocation.location.characters}
                choices={campaignCharacters ? campaignCharacters.map(([, character]: [string, ICharacter]) => ({ title: character.name, content: character })) : []}
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
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Resources in ${selectedLocation.location.name}`} </h1>
            </div>


            <SensoAccordianInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/resources`}
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
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Key Elements in ${selectedLocation.location.name}`} </h1>
            </div>



            <SensoAccordianInput
                firebasePath={`campaigns/${selectedCampaign.id}/locations/${selectedLocation.id}/keyElements`}
                initArray={selectedLocation.location.keyElements}
                label={"Key elements"}
                style={{ width: "100%" }}
            />


            <h1 style={{ flex: 2, textAlign: "center" }}>Description and history</h1>
            <DraftJSEditor
                characterMentionList={characterMentionList}
                readOnly={false}
                JSONRef={storageRef?.child("LocationDescription.json")}
                locationMentionList={locationMentionList}
            />

            <h1>Images</h1>
            <SensoImageInput
                style={{ width: "100%" }}
                storagePath={`Campaigns/${selectedCampaign.campaign.slug}/Locations/${selectedLocation.location.slug}/LocationImages`}
            />
        </div >
    );
};


export default CampaignLocationEdit;

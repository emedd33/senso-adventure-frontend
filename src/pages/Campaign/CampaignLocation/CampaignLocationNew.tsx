import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NEW_LOCATION, OLD_WHITE } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { setAlertDialog } from "../../../store/admin/adminCreator";
import styled from "styled-components";
import { setSelectedLocation } from "../../../store/selected/selectedCreators";
import { database } from "../../../firebase";
export interface CampaignLocationNewProps { }


const CampaignLocationNew: React.FC<CampaignLocationNewProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );

    const [locationName, setLocationName] = useState<string>("");
    const [locationNameError, setLocationNameError] = useState<boolean>(false)

    const submitLocation = () => {
        if (selectedCampaign) {
            if (!locationName) {
                setLocationNameError(true);
                dispatch(
                    setAlertDialog("Please fille out the Location name", true, true)
                );
                return;
            }

            const toUpload: ILocation = {
                ...NEW_LOCATION,
                name: locationName,
                slug: locationName.replace(/\s/g, ""),

            };
            database.ref(`campaigns/${selectedCampaign.id}/locations`)
                .push(toUpload)
                .then((snap) => {
                    snap.once("value", async (snapshot: any) => {
                        dispatch(
                            setSelectedLocation({ id: snapshot.key, location: snapshot.val() })
                        );
                        history.push(
                            `/${selectedCampaign.campaign.slug}/locations/${toUpload.slug}/edit`
                        );
                    });
                });
        }
    };

    if (!selectedCampaign) {
        return <IsLoading />;
    }
    return (
        <TitleContainer>
            <TextField
                id="outlined-multiline-static"
                placeholder="Write a fitting name"
                variant="filled"
                disabled={false}
                style={{ width: "90%", margin: "1rem" }}
                label="Location Name"
                error={locationNameError}
                value={locationName}
                onChange={(event) => setLocationName(event.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                style={{ margin: "2rem" }}
                onClick={submitLocation}
            >
                Continue
      </Button>
        </TitleContainer>
    );
};

const TitleContainer = styled.div`
  background-color: ${OLD_WHITE};
  width: 50%;
  min-width: 15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
export default CampaignLocationNew;

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NEW_LOCATION, OLD_WHITE } from "../../../../assets/constants/Constants";
import { setAlertDialog } from "../../../../store/admin/adminCreator";
import styled from "styled-components";
import { database } from "../../../../services/Firebase/firebase";
import useOwner from "../../../../store/hooks/useOwner";
import { getSelectedCampaign } from "../../../../store/selected/selectedSelectors";
export interface LocationNewProps { }


const LocationNew: React.FC<LocationNewProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const owner = useOwner()
    const selectedCampaign = useSelector(getSelectedCampaign);

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
            database.ref(`users/${owner}/campaigns/${selectedCampaign.id}/locations`)
                .push(toUpload)
                .then((snap) => {
                    snap.once("value", async (snapshot: any) => {
                        history.push(
                            `/users/${owner}/campaigns/${selectedCampaign.campaign.slug}/locations/${toUpload.slug}`
                        );
                    });
                });
        }
    };

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
export default LocationNew;

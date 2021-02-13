import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import IsLoading from "../../components/IsLoading/IsLoading";
import { campaignsRef, firebaseStorageRef } from "../../firebase";
import { setAlertDialog } from "../../store/admin/adminCreator";
import { useImageFile } from "../../store/hooks/useImageFile";
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators";
import { isValidImageFile } from "../../utils/isValidImageFile";

export interface CampaignEditProps { }

const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );
    const [campaignTitle, setCampaignTitle] = useState<string>(
        selectedCampaign.campaign.title
    );
    const userName = useSelector(
        (state: RootReducerProp) => state.admin.authUser?.username
    );
    const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false);
    const [
        campaignBackgroundImageFile,
        setCampaignBackgroundImageFile,
    ] = useImageFile("BackgroundImage");
    const [campaignTitleImageFile, setCampaignTitleImageFile] = useImageFile("TitleImage"
    );
    const postProcssCampaign = async (key: string) => {
        const metadata = {
            customMetadata: {
                contentType: "image",
                campaignId: key,
                campaignTitle: campaignTitle,
            },
        };
        if (isValidImageFile(campaignBackgroundImageFile)) {
            await firebaseStorageRef
                .child("Campaigns")
                .child(campaignTitle)
                .child("BackgroundImage")
                .put(campaignBackgroundImageFile.file.file, metadata);
        }
        if (isValidImageFile(campaignTitleImageFile)) {
            await firebaseStorageRef
                .child("Campaigns")
                .child(campaignTitle)
                .child("TitleImage")
                .put(campaignTitleImageFile.file.file, metadata);
        }
        dispatch(dispatchSetSelectedCampaign(key));
        history.push("/campaign");
    };
    const submit = () => {
        setIsLoading(true);
        if (!campaignTitle) {
            setCampaignTitleError(true);
            dispatch(
                setAlertDialog("Please fille out the Campaign Title", true, true)
            );
            setIsLoading(false);
            return;
        } else {
            setCampaignTitleError(false);
        }

        try {
            let newCampaign = {
                dungeonMaster: userName,
                title: campaignTitle,
            };
            if (selectedCampaign.campaign.isNew) {
                campaignsRef
                    .push(newCampaign)
                    .then((snap) => {
                        snap.once("value", async (snapshot: any) => {
                            let key = snapshot.key;
                            if (key) {
                                postProcssCampaign(key);
                            }
                        });
                    })
                    .catch((e) => console.log("Could not update campaing "));
            } else {
                campaignsRef
                    .child(selectedCampaign.id)
                    .set(newCampaign)
                    .then(() => {
                        postProcssCampaign(selectedCampaign.id);
                    })
                    .catch((e) => console.log("Could not update campaing " + e));
            }
        } catch (error) {
            setIsLoading(false);
            dispatch(setAlertDialog(error, true, true));
        }
    };
    return (
        <Container>
            {isLoading ? (
                <IsLoading />
            ) : (
                    <>
                        <h1 style={{ textAlign: "center", fontFamily: "serif" }}>
                            Campaign Creator
          </h1>
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Write a fitting title"
                            style={{ width: "50%", textAlign: "center" }}
                            variant="filled"
                            error={campaignTitleError}
                            value={campaignTitle}
                            onChange={(event: any) => setCampaignTitle(event.target.value)}
                        />
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    margin: "1rem",
                                    width: "15rem",
                                }}
                            >
                                <h3 style={{ fontFamily: "serif", textAlign: "center" }}>
                                    {" "}
                Background Image
              </h3>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "15rem",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {campaignBackgroundImageFile.name ? (
                                    <h4 style={{ fontFamily: "sans-serif" }}>
                                        {campaignBackgroundImageFile.name}
                                    </h4>
                                ) : null}
                                <ImageUpload
                                    imageFile={campaignBackgroundImageFile.file}
                                    setImageFile={setCampaignBackgroundImageFile}
                                    maxFiles={1}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    margin: "1rem",
                                    width: "15rem",
                                }}
                            >
                                <h3 style={{ fontFamily: "serif" }}>
                                    {" "}
                Choose campaign title image
              </h3>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "15rem",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {campaignTitleImageFile.name ? (
                                    <h4 style={{ fontFamily: "sans-serif" }}>
                                        {campaignTitleImageFile.name}
                                    </h4>
                                ) : null}
                                <ImageUpload
                                    imageFile={campaignTitleImageFile.file}
                                    setImageFile={setCampaignTitleImageFile}
                                    maxFiles={1}
                                />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            onClick={submit}
                            style={{ marginTop: "1rem" }}
                            color="primary"
                        >
                            Submit
          </Button>
                    </>
                )}
        </Container>
    );
};
const Container = styled.div`
  margin-bottom: 10rem;
  margin-top: 5rem;
  width: 70%;
  background-color: ${OLD_WHITE};
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 1rem;
  flex-direction: column;
`;

export default CampaignEdit;

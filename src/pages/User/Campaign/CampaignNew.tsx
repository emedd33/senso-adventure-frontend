import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../../assets/constants/Constants";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { setAlertDialog } from "../../../store/admin/adminCreator";
import { getAuthUser } from "../../../store/admin/adminSelectors";
import { useImageFile } from "../../../store/hooks/useImageFile";
import { isValidImageFile } from "../../../utils/isValidImageFile";
import { pushToDatabase } from "../../../services/Firebase/database";
import { pushToStorage } from "../../../services/Firebase/storage";
import { transformTitleToSlug } from "../../../utils/StringProcessing";
import useOwner from "../../../store/hooks/useOwner";
import { useTranslation } from "react-i18next";

export interface CampaignNewProps { }

const CampaignNew: React.FC<CampaignNewProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const owner = useOwner();
  const translate = useTranslation();
  const authUser = useSelector(getAuthUser);
  const [isLoading, setIsLoading] = useState(false);

  const [campaignTitle, setCampaignTitle] = useState<string>();
  const user = useSelector(getAuthUser);
  const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false);
  const [
    campaignBackgroundImageFile,
    setCampaignBackgroundImageFile,
  ] = useImageFile("BackgroundImage");
  const [campaignTitleImageFile, setCampaignTitleImageFile] = useImageFile(
    "TitleImage"
  );
  const submit = async () => {
    setIsLoading(true);
    if (user) {
      // Checks if the inputs are valid

      // Creates instances of the campaign is a new one
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
      let title = campaignTitle;
      let slug = transformTitleToSlug(campaignTitle);
      var newCampaign = {
        dungeonMaster: { username: user.displayName, uid: user.uid },
        title: title,
        slug: slug,
      };
      await pushToDatabase(`users/${user.displayName}/campaigns/`, newCampaign);

      // Updates storage files of title image and background image
      if (slug && title) {
        const metadata = {
          customMetadata: {
            contentType: "image",
            campaignTitle: title,
          },
        };

        if (isValidImageFile(campaignBackgroundImageFile)) {
          pushToStorage(
            `users/${user.displayName}/campaigns/${slug}/BackgroundImage`,
            campaignBackgroundImageFile.file.file,
            metadata
          );
        }
        if (isValidImageFile(campaignTitleImageFile)) {
          pushToStorage(
            `users/${user.displayName}/campaigns/${slug}/TitleImage`,
            campaignTitleImageFile.file.file,
            metadata
          );
        }
        history.push(`/user/${authUser.displayName}/campaigns/${slug}`);
      }
    }
  };
  if (!owner) {
    return (
      <Container>
        <IsLoading />
      </Container>
    );
  }
  if (!authUser || owner !== authUser.displayName) {
    return <Redirect to="/" />;
  }
  return (
    <ParentContainer>
      {isLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <>
            <h1 style={{ textAlign: "center", fontFamily: "serif" }}>
              {translate.t("New Campaign")}
            </h1>
            <TextField
              id="outlined-multiline-static"
              placeholder={translate.t("Write a title")}
              style={{ width: "50%", textAlign: "center" }}
              variant="outlined"
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
                  {translate.t("Background Image")}
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
                  {translate.t("Campaign title image")}
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
              style={{
                margin: "1rem",
                marginBottom: "5rem",
                textTransform: "none",
              }}
              color="primary"
            >
              {translate.t("Submit")}
            </Button>
          </>
        </Container>
      )}
    </ParentContainer>
  );
};
const ParentContainer = styled.div`
  z-index: 300;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
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

export default CampaignNew;

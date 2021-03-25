import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import IsLoading from "../../components/IsLoading/IsLoading";
import { setAlertDialog } from "../../store/admin/adminCreator";
import { getAuthUser } from "../../store/admin/adminSelectors";
import { useImageFile } from "../../store/hooks/useImageFile";
import { getSelectedCampaign, getSelectedCampaignDatabasePath } from "../../store/selected/selectedSelectors";
import { isValidImageFile } from "../../utils/isValidImageFile";
import BackgroundImage from "../../assets/Images/background_home.jpg";
import { SensoDelete } from "../../components/SensoInputs";
import { pushToDatabase } from "../../services/Firebase/database"
import { getUrlFromStorage, pushToStorage } from "../../services/Firebase/storage"
import { transformTitleToSlug } from "../../utils/StringProcessing"
import useOwner from "../../store/hooks/useOwner";
export interface CampaignEditProps {
  isNew: boolean;
}

const CampaignEdit: React.FC<CampaignEditProps> = ({ isNew }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const owner = useOwner()
  const [imageUrl, setImageUrl] = useState("");

  const authUser = useSelector(getAuthUser)
  const [isLoading, setIsLoading] = useState(false);
  const selectedCampaign = useSelector(getSelectedCampaign);
  const campaignDatabasePath = useSelector(getSelectedCampaignDatabasePath)

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
  useEffect(() => {
    if (!isNew && campaignDatabasePath) {
      getUrlFromStorage(`${campaignDatabasePath}/BackgroundImage`)
        .then((url: string) => {
          setImageUrl(url);
        })
        .catch((e) => console.log("could not fetch background image"));
    } else {
      setImageUrl(BackgroundImage)
    }
  }, [isNew, selectedCampaign, campaignDatabasePath]);

  useEffect(() => {
    if (selectedCampaign) {
      setCampaignTitle(selectedCampaign.campaign.title);
    }
  }, [selectedCampaign]);
  const submit = async () => {
    setIsLoading(true);
    if (user) {
      // Checks if the inputs are valid
      let slug = selectedCampaign?.campaign.slug
      let title = selectedCampaign?.campaign.title
      if (isNew) {

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
        title = campaignTitle
        slug = transformTitleToSlug(campaignTitle);
        var newCampaign = {
          dungeonMaster: { username: user.displayName, uid: user.uid },
          title: title,
          slug: slug,
        };
        await pushToDatabase(`users/${user.displayName}/campaigns/`, newCampaign)

      }

      // Updates storage files of title image and background image
      if (slug && title) {
        const metadata = {
          customMetadata: {
            contentType: "image",
            campaignTitle: title,
          },
        };

        if (isValidImageFile(campaignBackgroundImageFile)) {

          pushToStorage(`users/${user.displayName}/campaigns/${slug}/BackgroundImage`, campaignBackgroundImageFile.file.file, metadata)
        }
        if (isValidImageFile(campaignTitleImageFile)) {
          pushToStorage(`users/${user.displayName}/campaigns/${slug}/TitleImage`, campaignTitleImageFile.file.file, metadata)
        }
        history.push(`/user/${authUser.displayName}/campaigns/${slug}`);
      }
    }
  }
  if (!authUser || owner !== authUser.displayName) {
    return <Redirect to="/" />
  }
  return (
    <ParentContainer style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      {isLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <>
            <h1 style={{ textAlign: "center", fontFamily: "serif" }}>
              Campaign Creator
            </h1>
            <TextField
              id="outlined-multiline-static"
              placeholder="Write a fitting title"
              style={{ width: "50%", textAlign: "center" }}
              variant="outlined"
              error={campaignTitleError}
              value={campaignTitle}
              disabled={!isNew}
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
              style={{ margin: "1rem", marginBottom: "5rem" }}
              color="primary"
            >
              Submit
            </Button>
            {selectedCampaign && !isNew ?
              <SensoDelete
                storagePath={`Campaigns/${selectedCampaign.campaign.slug}`}
                databasePath={`campaigns/${selectedCampaign.id}/`}
                instanceType="Session"
                linkPath={`/`}
              />
              : null}
          </>

        </Container>
      )}
    </ParentContainer>
  );
}
const ParentContainer = styled.div`
  z-index: 300;
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
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

export default CampaignEdit;

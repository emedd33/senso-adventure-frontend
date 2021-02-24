import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HelpIcon from "@material-ui/icons/Help";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { campaignsRef, firebaseStorageRef, storage } from "../../firebase";
import "react-markdown-editor-lite/lib/index.css";
import { setAlertDialog, setIsLoading } from "../../store/admin/adminCreator";
import styled from "styled-components";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { useImageFile } from "../../store/hooks/useImageFile";
import { isValidImageFile } from "../../utils/isValidImageFile";
import EditMultilineTextField from "../../components/EditMultilineTextField/EditMultilineTextField";
export interface CampaignSessionEditProps { }

const CampaignSessionEdit: React.FC<CampaignSessionEditProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedSession = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession
    );
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );

    const [sessionDay, setSessionDay] = useState<number | undefined>(selectedSession.session.sessionDay);
    const [sessionSubTitle, setSessionSubTitle] = useState<string | undefined>(selectedSession.session.subTitle);

    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false);

    const [sessionDate, setSessionDate] = useState<string>(new Date(selectedSession.session.date).toDateString())
    const [sessionImageFiles1, setSessionImage1Files] = useImageFile();
    const [sessionImageFiles2, setSessionImage2Files] = useImageFile();
    const [sessionImageFiles3, setSessionImage3Files] = useImageFile();
    const [sessionImage1, setSessionImage1] = useState();
    const [sessionImage2, setSessionImage2] = useState();
    const [sessionImage3, setSessionImage3] = useState();
    console.log(selectedSession)

    useEffect(() => {
        if (selectedSession && selectedSession?.session.story) {
            let storageRef = storage
                .ref()
                .child("Campaigns")
                .child(selectedCampaign.campaign.title)
                .child("Sessions")
                .child(selectedSession.session.title);

            storageRef
                .child("SessionImageFile1")
                .getDownloadURL()
                .then((url) => setSessionImage1(url))
                .catch(() => console.log("could not get session image 1"));
            storageRef
                .child("SessionImageFile2")
                .getDownloadURL()
                .then((url) => setSessionImage2(url))
                .catch(() => console.log("could not get session image 2"));
            storageRef
                .child("SessionImageFile3")
                .getDownloadURL()
                .then((url) => setSessionImage3(url))
                .catch(() => console.log("could not get session image 3"));
        }
    }, [dispatch, selectedSession, selectedCampaign]);


    const submitSession = () => {
        const toUpload = {
            date: sessionDate,
            subTitle: sessionSubTitle ? sessionSubTitle : "",
            campaignTitle: selectedCampaign.campaign.title,
            sessionDay: sessionDay ? sessionDay : 1,
        };
        if (
            selectedCampaign.campaign.sessions &&
            Object.values(selectedCampaign.campaign.sessions).filter((session) => {
                return (
                    session.sessionDay === sessionDay && session.title !== selectedSession.session.title
                );
            }).length > 0
        ) {
            dispatch(
                setAlertDialog(
                    "Session day is invalid due to duplicated session days",
                    true,
                    true
                )
            );
            return;
        }
        campaignsRef
            .child(selectedCampaign.id)
            .child("sessions/" + selectedSession.id)
            .set(toUpload)
            .then(async (e) => {
                await postProcessFiles(selectedSession);
                history.push(`/${selectedCampaign.campaign.slug}/${selectedSession.session.slug}`);
            });
    }
    const postProcessFiles = async (
        session: ISelectedSession,
    ) => {
        dispatch(setIsLoading(true));

        let sessionStorragePath = firebaseStorageRef
            .child("Campaigns")
            .child(selectedCampaign.campaign.title)
            .child("Sessions")
            .child(selectedSession.session.title);


        let imageMetadata = {
            session: session.id,
            campaign: selectedCampaign.id,
            date: sessionDate,
            day: sessionDay,
            contentType: "image/png",
        };

        if (isValidImageFile(sessionImageFiles1)) {
            await sessionStorragePath
                .child("SessionImageFile1")
                .put(sessionImageFiles1.file.file, imageMetadata)
        }
        if (isValidImageFile(sessionImageFiles2)) {
            await sessionStorragePath
                .child("SessionImageFile2")
                .put(sessionImageFiles2.file.file, imageMetadata)
        }
        if (isValidImageFile(sessionImageFiles3)) {
            await sessionStorragePath
                .child("SessionImageFile3")
                .put(sessionImageFiles3.file.file, imageMetadata)

        }

        dispatch(setIsLoading(false));
    };


    if (!selectedSession) {
        return <IsLoading />;
    }
    return (
        <div
            style={{
                marginBottom: "10rem",
                width: "70%",
                backgroundColor: OLD_WHITE,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                padding: "1rem",
                flexDirection: "column",
            }}
        >
            <TitleContainer>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Write a fitting title"
                    variant="filled"
                    disabled={true}
                    style={{ width: "90%", margin: "1rem" }}
                    label="Session title"
                    error={sessionTitleError}
                    value={selectedSession.session.title}
                />

                <TextField
                    id="outlined-multiline-static"
                    placeholder="Write a fitting subtitle"
                    style={{ width: "90%", margin: "1rem" }}
                    variant="filled"
                    label="Subtitle"
                    value={sessionSubTitle}
                    onChange={(event) => setSessionSubTitle(event.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Session day"
                    placeholder="Which session is this?"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: "90%", margin: "1rem" }}
                    value={sessionDay}
                    onChange={(event) => {
                        let day =
                            parseInt(event.target.value) < 0
                                ? 0
                                : parseInt(event.target.value);
                        if (day) {
                            setSessionDay(day);
                        }
                    }}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        autoOk
                        style={{ margin: "1rem" }}
                        clearable
                        disableFuture
                        value={sessionDate}
                        onChange={(date) =>
                            setSessionDate(
                                date ? date.toDateString() : new Date().toDateString()
                            )
                        }
                    />
                </MuiPickersUtilsProvider>
            </TitleContainer>
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>The Story</h3>
                <Tooltip title="The Story to be showcased for all players">
                    <IconButton aria-label="help">
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <p style={{ textAlign: "left", fontFamily: "sans-serif" }}>
                {
                    "To add a secret note encapsulte the secret note with the '<secret> </secret>' tag"
                }
            </p>
            <EditMultilineTextField />
            <h3>Add uo to 3 pictures to the session</h3>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    justifyContent: "center"
                }}
            >
                <div
                    style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}
                >
                    <ImageUpload
                        imageFile={sessionImageFiles1.file}
                        setImageFile={setSessionImage1Files}
                        maxFiles={1}
                    />

                    {sessionImage1 ? (
                        <>
                            <h2 style={{ textAlign: "center" }}>Current first image</h2>
                            <SessionImage src={sessionImage1} />
                        </>
                    ) : null}
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}
                >
                    <ImageUpload
                        imageFile={sessionImageFiles2.file}
                        setImageFile={setSessionImage2Files}
                        maxFiles={1}
                    />
                    {sessionImage2 ? (
                        <>
                            <h2 style={{ textAlign: "center" }}>Current second image</h2>

                            <SessionImage src={sessionImage2} />
                        </>
                    ) : null}
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}
                >
                    <ImageUpload
                        imageFile={sessionImageFiles3.file}
                        setImageFile={setSessionImage3Files}
                        maxFiles={1}
                    />
                    {sessionImage3 ? (
                        <>
                            <h2 style={{ textAlign: "center" }}>Current third image</h2>

                            <SessionImage src={sessionImage3} />
                        </>
                    ) : null}
                </div>
            </div>

            <Button
                variant="contained"
                color="primary"
                style={{ margin: "2rem" }}
                onClick={submitSession}
            >
                Submit
      </Button>
        </div>
    );
};

const TitleContainer = styled.div`
  background-color: white;
  width: 50%;
  min-width:15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
const SessionImage = styled.img`
  width: 10rem;
  margin: 2rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
`;
export default CampaignSessionEdit;

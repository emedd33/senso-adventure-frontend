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
import {
    dispatchSetSelectedCampaign,
    dispatchSetSelectedSession,
} from "../../store/selected/selectedCreators";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { setAlertDialog, setIsLoading } from "../../store/admin/adminCreator";
import styled from "styled-components";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { useImageFile } from "../../store/hooks/useImageFile";
import { isValidImageFile } from "../../utils/isValidImageFile";
export interface CampaignSessionEditProps { }

const mdParser = new MarkdownIt(/* Markdown-it options */);
const CampaignSessionEdit: React.FC<CampaignSessionEditProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedSession = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession
    );
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );
    const sessionFile = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession?.session.story
    );
    const sessionsId = selectedSession ? selectedSession.id : null;
    const [sessionDay, setSessionDay] = useState<number>(
        selectedSession?.session.sessionDay
    );
    const [sessionSubTitle, setSessionSubTitle] = useState<string | undefined>(
        selectedSession?.session.subTitle
    );
    const [sessionTitle, setSessionTitle] = useState<string>(
        selectedSession?.session.title
    );
    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false);
    const [sessionStory, setSessionStory] = useState<string>("");

    const [sessionDate, setSessionDate] = useState<string>(
        selectedSession?.session.date
            ? new Date(selectedSession.session.date).toDateString()
            : new Date().toDateString()
    );
    const [sessionImageFiles1, setSessionImage1Files] = useImageFile();
    const [sessionImageFiles2, setSessionImage2Files] = useImageFile();
    const [sessionImageFiles3, setSessionImage3Files] = useImageFile();
    const [sessionImage1, setSessionImage1] = useState();
    const [sessionImage2, setSessionImage2] = useState();
    const [sessionImage3, setSessionImage3] = useState();

    useEffect(() => {
        dispatch(setIsLoading(true));
        if (selectedSession && selectedSession?.session.story) {
            let storageRef = storage
                .ref()
                .child("Campaigns")
                .child(selectedCampaign.campaign.title)
                .child("Sessions")
                .child(selectedSession.session.title);

            storageRef
                .child(selectedSession.session.story)
                .getDownloadURL()
                .then((url) =>
                    fetch(url)
                        .then((res) => res.text())
                        .then((res) => setSessionStory(res))
                )
                .catch((e) => console.log("error", e));
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
        dispatch(setIsLoading(false));
    }, [dispatch, selectedSession, selectedCampaign]);
    const postProcessFiles = (
        session: ISelectedSession,
        sessionMDFile: string
    ) => {
        dispatch(
            dispatchSetSelectedSession({
                id: session.id,
                session: {
                    title: sessionTitle,
                    subTitle: sessionSubTitle,
                    date: sessionDate,
                    story: sessionMDFile,
                    sessionDay: sessionDay,
                    campaign: session.session.campaign,
                },
            })
        );
        dispatch(dispatchSetSelectedCampaign(selectedCampaign!.id));
        var file = new File([sessionStory], sessionMDFile, {
            type: "text/plain;charset=utf-8",
        });
        let sessionStorragePath = firebaseStorageRef
            .child("Campaigns")
            .child(selectedCampaign.campaign.title)
            .child("Sessions")
            .child(sessionTitle);

        let markdownMetadata = {
            contentType: "markdown",
            session: session.id,
            campaign: selectedCampaign.id,
            date: sessionDate,
            day: sessionDay,
        };
        sessionStorragePath.child(sessionMDFile).put(file, markdownMetadata);

        let imageMetadata = {
            ...markdownMetadata,
            contentType: "image/png",
        };

        if (isValidImageFile(sessionImageFiles1))
            sessionStorragePath
                .child("SessionImageFile1")
                .put(sessionImageFiles1.file.file, imageMetadata);
        if (isValidImageFile(sessionImageFiles2))
            sessionStorragePath
                .child("SessionImageFile2")
                .put(sessionImageFiles2.file.file, imageMetadata);
        if (isValidImageFile(sessionImageFiles3))
            sessionStorragePath
                .child("SessionImageFile3")
                .put(sessionImageFiles3.file.file, imageMetadata);
        history.push("/campaign");
    };
    const submitSession = () => {
        if (!sessionTitle) {
            setSessionTitleError(true);
            dispatch(
                setAlertDialog("Please fille out the Session Title", true, true)
            );
            return;
        }
        if (selectedCampaign?.id) {
            let sessionMDFile = sessionFile
                ? sessionFile
                : sessionTitle + "_" + selectedCampaign.id + "_" + sessionDate + ".md";
            const toUpload = {
                campaign: selectedCampaign.id,
                date: sessionDate ? sessionDate : new Date().toDateString(),
                story: sessionMDFile,
                title: sessionTitle,
                subTitle: sessionSubTitle ? sessionSubTitle : "",
                campaignTitle: selectedCampaign.campaign.title,
                sessionDay: sessionDay ? sessionDay : 1,
            };
            if (
                selectedCampaign.campaign.sessions &&
                Object.values(selectedCampaign.campaign.sessions).filter((session) => {
                    return (
                        session.sessionDay === sessionDay && session.title !== sessionTitle
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

            if (sessionsId) {
                campaignsRef
                    .child(selectedCampaign.id)
                    .child("sessions/" + sessionsId)
                    .set(toUpload)
                    .then((e) => {
                        postProcessFiles(selectedSession, sessionMDFile);
                    });
            } else {
                campaignsRef
                    .child(selectedCampaign.id)
                    .child("sessions")
                    .push(toUpload)
                    .then((snap) => {
                        snap.once("value", async (snapshot: any) => {
                            const session = { id: snapshot.key, session: snapshot.val() };
                            postProcessFiles(session, sessionMDFile);
                        });
                    });
            }
        }
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
                    disabled={selectedSession.session.title ? true : false}
                    style={{ width: "90%", margin: "1rem" }}
                    label="Session title"
                    error={sessionTitleError}
                    value={sessionTitle}
                    onChange={(event) => setSessionTitle(event.target.value)}
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
            <MdEditor
                style={{
                    height: "500px",
                    width: "100%",
                    margin: "1rem",
                    marginTop: "0",
                    fontFamily: "sans-serif",
                }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={(html: any) => setSessionStory(html.text)}
                value={sessionStory ? sessionStory : ""}
            />
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

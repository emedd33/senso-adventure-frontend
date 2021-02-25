import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import "react-markdown-editor-lite/lib/index.css";
import styled from "styled-components";
import ImageUploader from 'react-images-upload';
import sleep from "../../utils/sleep"
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CircularProgress from '@material-ui/core/CircularProgress';


import useInterval from "../../store/hooks/useInterval";
import { getSelectedSessionDatabaseRef, getSelectedSessionStorageRef } from "../../store/selected/selectedSelectors";
export interface CampaignSessionEditProps { }

const CampaignSessionEdit: React.FC<CampaignSessionEditProps> = () => {

    const selectedSession = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession
    );

    const [isUploading, setIsUploading] = useState(false)
    const [isUploadingImages, setIsUploadingImages] = useState(false)

    const [text, setText] = useState<string>("")
    const [savedText, setSavedText] = useState<string>("")

    const [sessionDate, setSessionDate] = useState<string>(new Date(selectedSession.session.date).toDateString())
    const [savedSessionDate, setSavedSessionDate] = useState<string>(new Date(selectedSession.session.date).toDateString())

    const [sessionSubTitle, setSessionSubTitle] = useState<string | undefined>(selectedSession.session.subTitle);
    const [SavedSessionSubTitle, setSavedSessionSubTitle] = useState<string | undefined>(selectedSession.session.subTitle);
    const storageRef = useSelector(getSelectedSessionStorageRef)
    const databaseRef = useSelector(getSelectedSessionDatabaseRef)

    const [sessionDay, setSessionDay] = useState<number | undefined>(selectedSession.session.sessionDay);
    const [savedSessionDay, setSavedSessionDay] = useState<number | undefined>(selectedSession.session.sessionDay);

    const [newSessionImages, setNewSessionImages] = useState<any[]>([]);
    const [ImageUploaderKey, setImageUploaderKey] = useState(0);
    const [existingSessionImageUrl, setExistingSessionImageUrl] = useState<any[]>([]);

    useEffect(() => {
        storageRef
            .child("SessionImages").listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    itemRef.getDownloadURL()
                        .then(url => {
                            setExistingSessionImageUrl(urls => {
                                if (!urls.includes(url)) {
                                    return [...urls, url]
                                }
                                return urls
                            })
                        })
                        .catch(e => console.log("Could not connect to firebase", e))
                });

            }).catch((error) => {
                console.log("Error fetching session images", error)
            });
        return (() => {
            setNewSessionImages([])
            setExistingSessionImageUrl([])
        })
    }, [storageRef])

    useInterval(async () => {    // Your custom logic here 
        setIsUploading(true)
        if (text !== undefined && text !== savedText) {
            setSavedText(text)
            storageRef
                .child("SessionStory.html")
                .putString(savedText).catch(e => console.log("Could not update session story", e))
        }
        if (sessionSubTitle !== SavedSessionSubTitle) {
            databaseRef.child("subTitle").set(sessionSubTitle)
            setSavedSessionSubTitle(sessionSubTitle)
        }
        if (sessionDate !== savedSessionDate) {
            databaseRef.child("date").set(sessionDate)
            setSavedSessionDate(sessionDate)
        }

        if (sessionDay !== savedSessionDay) {
            databaseRef.child("sessionDay").set(sessionDay)
            setSavedSessionDay(sessionDay)
        }
        sleep(5000).then(() => {
            setIsUploading(false)
        });
    },
        5000)

    const submitImages = async () => {
        setIsUploadingImages(true)
        await Promise.all(newSessionImages.map(
            newImage => {
                let uploadTask =
                    storageRef
                        .child("SessionImages")
                        .child(newImage.name)
                        .put(newImage)
                return uploadTask.on('state_changed',
                    () => { },
                    (error) => {
                        console.log(`Could not upload ${newImage.name}`, error)
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            setExistingSessionImageUrl((urls) => [...urls, downloadURL])
                            return downloadURL
                        });
                    }
                );
            })).then((res) => {
                setNewSessionImages([])
                setImageUploaderKey(ImageUploaderKey + 1);
                setIsUploadingImages(false)
            })
    }
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
                <h2>{selectedSession.session.title}</h2>

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
            <EditContainer >

                <EditContainerHeader>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                        <IconButton aria-label="Bold">
                            <FormatBoldIcon />
                        </IconButton>
                        <IconButton aria-label="Italic" >
                            <FormatItalicIcon />
                        </IconButton>
                        <IconButton aria-label="Bullets" >
                            <FormatListBulletedIcon />
                        </IconButton>
                        <IconButton aria-label="Bullets" >
                            <VpnKeyIcon />
                        </IconButton>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignContent: "center", paddingRight: "1rem" }}>
                        {isUploading ? <CircularProgress size="1rem" /> : " "}
                    </div>
                </EditContainerHeader>
                <EditContainerBody contentEditable="true" onInput={e => setText(e.currentTarget.innerHTML)} id={"editContainer"} suppressContentEditableWarning={true}>

                </EditContainerBody>
            </EditContainer>

            {isUploadingImages ?
                <div style={{ minHeight: "10rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                : <>
                    {existingSessionImageUrl.map((url) => <img src={url} alt="SessionImage" style={{ width: "10rem", height: "10rem" }} />)}
                    <ImageUploader
                        key={ImageUploaderKey}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={(newImages: any) => setNewSessionImages([...newSessionImages, ...newImages])}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <Button variant="contained" onClick={submitImages}>
                        Upload Pictures
            </Button>
                </>
            }

        </div >
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

const EditContainerBody = styled.div`
min-height:20rem;
background-color:white;
padding:1rem;
border-style: inset;
font-family:sans-serif;
`
const EditContainerHeader = styled.div`
justify-content:space-between;
align-items: center;
display:flex;
background-color:lightgray;
`
const EditContainer = styled.div`
width:90%;
`


export default CampaignSessionEdit;

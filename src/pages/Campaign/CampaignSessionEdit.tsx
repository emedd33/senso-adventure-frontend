import { Button, CardActionArea, CardMedia, IconButton, makeStyles, Switch, TextField } from "@material-ui/core";
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ClearIcon from '@material-ui/icons/Clear';
import useInterval from "../../store/hooks/useInterval";
import { getSelectedSessionDatabaseRef, getSelectedSessionStorageRef } from "../../store/selected/selectedSelectors";
import { getIsLoading } from "../../store/admin/adminSelectors";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";
import useSavedState from "../../store/hooks/useSavedState";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "1rem",
        padding: "0.5rem"
    },
    media: {
        height: "10rem",
        width: "10rem"
    },
});


const CampaignSessionEdit: React.FC = () => {

    const selectedSession = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession
    );
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const isLoading = useSelector(getIsLoading)

    const [isPublished, setIsPublished, saveIsPublished, isSavedIsPublished] = useSavedState(selectedSession?.session.isPublished === "TRUE")
    const [sessionDate, setSessionDate] = useState<string>(new Date().toDateString())
    const [savedSessionDate, setSavedSessionDate] = useState<string>(new Date().toDateString())

    const [sessionSubTitle, setSessionSubTitle] = useState<string>("");
    const [SavedSessionSubTitle, setSavedSessionSubTitle] = useState<string>("");
    const storageRef = useSelector(getSelectedSessionStorageRef)
    const databaseRef = useSelector(getSelectedSessionDatabaseRef)
    const [sessionDay, setSessionDay] = useState<number>(1);
    const [savedSessionDay, setSavedSessionDay] = useState<number>(1);

    const [newSessionImages, setNewSessionImages] = useState<any[]>([]);
    const [ImageUploaderKey, setImageUploaderKey] = useState(0);
    const [existingSessionImages, setExistingSessionImages] = useState<any[]>([]);
    const classes = useStyles();

    useEffect(() => {
        if (selectedSession && storageRef) {

            setSessionDate(new Date(selectedSession.session.date).toDateString())
            setSavedSessionDate(new Date(selectedSession.session.date).toDateString())
            if (selectedSession.session.subTitle) {
                setSessionSubTitle(selectedSession.session.subTitle)
                setSavedSessionSubTitle(selectedSession.session.subTitle)
            }
            setSessionDay(selectedSession.session.sessionDay)
            setSavedSessionDay(selectedSession.session.sessionDay)
            storageRef
                .child("SessionImages").listAll()
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        let name = itemRef.name
                        itemRef.getDownloadURL()
                            .then(url => {
                                setExistingSessionImages(images => {
                                    if (!images.map(img => img.name).includes(name)) {
                                        return [...images, { url: url, name: name }]
                                    }
                                    return images
                                })
                            })
                            .catch(e => console.log("Could not connect to firebase", e))
                    });

                }).catch((error) => {
                    console.log("Error fetching session images", error)
                });
        }

        return (() => {
            setNewSessionImages([])
            setExistingSessionImages([])
        })
    }, [storageRef, selectedSession])


    useInterval(async () => {    // Your custom logic here 

        if (databaseRef) {
            if (!isSavedIsPublished) {
                saveIsPublished()
                databaseRef.child("isPublished").set(isPublished ? "TRUE" : "FALSE")
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
        }

    },
        1000)

    const submitImages = async () => {
        setIsUploadingImages(true)
        if (storageRef) {

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
                            let name = uploadTask.snapshot.ref.name
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                setExistingSessionImages((images) => [...images, { name: name, url: downloadURL }])
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
    }
    const removeImage = (deleteImage: any) => {
        if (storageRef) {

            storageRef
                .child("SessionImages")
                .child(deleteImage.name)
                .delete()
                .then(() => setExistingSessionImages(existingSessionImages.filter(existingImg => existingImg !== deleteImage)))
                .catch(e => console.log("Could not remove image file", e))
        }
    }
    if (isLoading || !selectedSession) {
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
                Publish:
                <Switch
                    checked={isPublished}
                    onChange={(event: { target: { checked: any; }; }) => {
                        setIsPublished(event.target.checked)
                    }}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TitleContainer>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                <h1 style={{ flex: 2, textAlign: "center" }}>Session story</h1>
            </div>
            <EditContainer>
                <DraftJSEditor readOnly={false} JSONRef={storageRef?.child("SessionStory.json")} />
            </EditContainer>

            <h1>Session Images</h1>

            {isUploadingImages ?
                <div style={{ minHeight: "10rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                : <>
                    <ImageUploader
                        key={ImageUploaderKey}
                        withIcon={true}
                        label="Max file size: 10mb, accepted: jpg|gif|png"
                        buttonText='Choose images'
                        onChange={(newImages: any) => setNewSessionImages([...newSessionImages, ...newImages])}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={10485760}
                        withPreview={true}
                    />
                    <Button variant="contained" onClick={submitImages}>
                        Upload Pictures
                    </Button>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1rem" }}>


                        {existingSessionImages.map((img) => {
                            return (

                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardActions style={{ display: "flex", justifyContent: "center", height: "2rem" }}>
                                            <IconButton aria-label="delete" onClick={() => removeImage(img)}>
                                                <ClearIcon color="secondary" />
                                            </IconButton>
                                        </CardActions>
                                        <CardMedia
                                            className={classes.media}
                                            image={img.url}
                                            title="Contemplative Reptile"
                                        />
                                    </CardActionArea>
                                </Card>
                            )
                        })
                        }
                    </div>
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

const EditContainer = styled.div`
width:90%;
`


export default CampaignSessionEdit;

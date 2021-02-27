import { Button, CardActionArea, CardMedia, IconButton, makeStyles, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ClearIcon from '@material-ui/icons/Clear';
import useInterval from "../../store/hooks/useInterval";
import { getSelectedSessionDatabaseRef, getSelectedSessionStorageRef } from "../../store/selected/selectedSelectors";
import { useQuill } from 'react-quilljs';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Tooltip from '@material-ui/core/Tooltip';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { getIsLoading } from "../../store/admin/adminSelectors";
import { setSelectedSession } from "../../store/selected/selectedCreators";

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
    const [isUploading, setIsUploading] = useState(false)
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const isLoading = useSelector(getIsLoading)

    const [savedText, setSavedText] = useState<string>("")

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
    const { quillRef, quill } = useQuill({
        modules: {
            toolbar: '#toolbar'
        },
        formats: ['bold', 'italic', 'underline', 'strike',
            'align', 'list', 'indent',
            'size', 'header',
            'link',
            'color', 'background',
            'clean',], // Important
    });
    const insertSecretToEditor = useCallback(() => {
        let selection = quill?.getSelection()
        if (selection && selection.length > 0) {
            quill?.formatText(selection.index, selection.length, { "color": "#9965db", "bold": true })
        };
    }, [quill])
    // Insert Image(selected by user) to quill
    React.useEffect(() => {
        if (quill) {
            // Add custom handler for Image Upload
            quill.getModule('toolbar').addHandler('ql-secret', insertSecretToEditor);
        }
    }, [quill, insertSecretToEditor]);
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
            storageRef.child("SessionStory.html")
                .getDownloadURL()
                .then(url =>
                    fetch(url)
                        .then(res => res.text())
                        .then(resText => {
                            if (quill) {
                                const delta = quill.clipboard.convert(resText)
                                if (delta) {
                                    quill.setContents(delta, "api");

                                }
                                setSavedText(resText)
                            }
                        })
                        .catch((e) => console.log("Could not fetch sessionstory", e))
                )
                .catch((e) => console.log("Could not connect to firebase for sessionstory", e))
        }

        return (() => {
            setNewSessionImages([])
            setExistingSessionImages([])
        })
    }, [storageRef, quill, selectedSession])


    useInterval(async () => {    // Your custom logic here 
        if (storageRef) {
            if (quill && quill.root.innerHTML !== savedText) {
                setIsUploading(true)
                setSavedText(quill.root.innerHTML)
                storageRef
                    .child("SessionStory.html")
                    .putString(quill.root.innerHTML)
                    .catch(e => console.log("Could not update session story", e))
            }
        }
        if (databaseRef) {

            if (sessionSubTitle !== SavedSessionSubTitle) {
                setIsUploading(true)
                databaseRef.child("subTitle").set(sessionSubTitle)
                setSavedSessionSubTitle(sessionSubTitle)
            }
            if (sessionDate !== savedSessionDate) {
                setIsUploading(true)
                databaseRef.child("date").set(sessionDate)
                setSavedSessionDate(sessionDate)
            }

            if (sessionDay !== savedSessionDay) {
                setIsUploading(true)
                databaseRef.child("sessionDay").set(sessionDay)
                setSavedSessionDay(sessionDay)
            }
        }
        sleep(2000).then(() => {
            setIsUploading(false)
        });
    },
        3000)

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
            </TitleContainer>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                <h1 style={{ flex: 2, textAlign: "right" }}>Session story</h1>
                <div style={{ flex: 1, margin: "1rem" }}>
                    {isUploading ? <CircularProgress /> : null}
                </div>
            </div>
            <EditContainer>
                <div style={{ width: "100%", backgroundColor: "white" }}>
                    <div id="toolbar">
                        <select className="ql-size">
                            <option value="small" />
                            <option selected />
                            <option value="large" />
                            <option value="huge" />
                        </select>
                        <Tooltip title="Secret message">
                            <button className="ql-secret" onClick={insertSecretToEditor} ><VpnKeyIcon /></button>
                        </Tooltip>
                        <Tooltip title="Bold">

                            <button className="ql-bold" />
                        </Tooltip>

                        <Tooltip title="Italic">
                            <button className="ql-italic" />
                        </Tooltip>
                        <Tooltip title="Underline">
                            <button className="ql-underline" />
                        </Tooltip>
                        <Tooltip title="Strike">
                            <button className="ql-strike" />
                        </Tooltip>
                        <Tooltip title="Link">
                            <button className="ql-link" />
                        </Tooltip>
                        <Tooltip title="Sub-text">
                            <button className="ql-script" value="sub" />
                        </Tooltip>
                        <Tooltip title="Super-text">
                            <button className="ql-script" value="super" />
                        </Tooltip>
                    </div>
                    <div id="editor" />
                    <div ref={quillRef} />
                </div>
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

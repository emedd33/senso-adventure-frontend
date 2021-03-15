import {
    Button,
    CardActionArea,
    CardMedia,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import "react-markdown-editor-lite/lib/index.css";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ClearIcon from "@material-ui/icons/Clear";
import {
    getSelectedCampaign,
    getSelectedCampaignCharacterMentionList,
    getSelectedSession,
    getSelectedSessionStorageRef,
} from "../../store/selected/selectedSelectors";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";
import { SensoDateInput, SensoNumberInput, SensoSwitch, SensoTextInput } from "../../components/SensoInputs";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "1rem",
        padding: "0.5rem",
    },
    media: {
        height: "10rem",
        width: "10rem",
    },
});

const CampaignSessionEdit: React.FC = () => {
    const classes = useStyles();
    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign)
    const [isUploadingImages, setIsUploadingImages] = useState(false);




    const storageRef = useSelector(getSelectedSessionStorageRef);

    const [newSessionImages, setNewSessionImages] = useState<any[]>([]);
    const [ImageUploaderKey, setImageUploaderKey] = useState(0);
    const [existingSessionImages, setExistingSessionImages] = useState<any[]>([]);
    const characterMentionList = useSelector(getSelectedCampaignCharacterMentionList)
    useEffect(() => {
        if (selectedSession && storageRef) {

            storageRef
                .child("SessionImages")
                .listAll()
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        let name = itemRef.name;
                        itemRef
                            .getDownloadURL()
                            .then((url) => {
                                setExistingSessionImages((images) => {
                                    if (!images.map((img) => img.name).includes(name)) {
                                        return [...images, { url: url, name: name }];
                                    }
                                    return images;
                                });
                            })
                            .catch((e) => console.log("Could not connect to firebase", e));
                    });
                })
                .catch((error) => {
                    console.log("Could not fetch session images");
                });
        }

        return () => {
            setNewSessionImages([]);
            setExistingSessionImages([]);
        };
    }, [storageRef, selectedSession]);



    const submitImages = async () => {
        setIsUploadingImages(true);
        if (storageRef) {
            await Promise.all(
                newSessionImages.map((newImage) => {
                    let uploadTask = storageRef
                        .child("SessionImages")
                        .child(newImage.name)
                        .put(newImage);
                    return uploadTask.on(
                        "state_changed",
                        () => { },
                        (error) => {
                            console.log(`Could not upload ${newImage.name}`, error);
                        },
                        () => {
                            let name = uploadTask.snapshot.ref.name;
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                setExistingSessionImages((images) => [
                                    ...images,
                                    { name: name, url: downloadURL },
                                ]);
                                return downloadURL;
                            });
                        }
                    );
                })
            ).then((res) => {
                setNewSessionImages([]);
                setImageUploaderKey(ImageUploaderKey + 1);
                setIsUploadingImages(false);
            });
        }
    };
    const removeImage = (deleteImage: any) => {
        if (storageRef) {
            storageRef
                .child("SessionImages")
                .child(deleteImage.name)
                .delete()
                .then(() =>
                    setExistingSessionImages(
                        existingSessionImages.filter(
                            (existingImg) => existingImg !== deleteImage
                        )
                    )
                )
                .catch((e) => console.log("Could not remove image file", e));
        }
    };
    if (!selectedSession || !selectedCampaign) {
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
                <SensoTextInput
                    initValue={selectedSession.session.subTitle}
                    firebasePath={`campaigns/${selectedCampaign.id}/sessions/${selectedSession.id}/subTitle`}
                    label={"Subtitle"}
                />
                <SensoNumberInput
                    initValue={selectedSession.session.sessionDay}
                    firebasePath={`campaigns/${selectedCampaign.id}/sessions/${selectedSession.id}/sessionDay`}
                    label={"Session day"}
                    isNegativeValid={false}
                />

                <SensoDateInput
                    initValue={selectedSession.session.date}
                    firebasePath={`campaigns/${selectedCampaign.id}/sessions/${selectedSession.id}/date`}
                    label={"Date"}
                />
                <SensoSwitch
                    initValue={selectedSession.session.isPublished}
                    firebasePath={`campaigns/${selectedCampaign.id}/sessions/${selectedSession.id}/isPublished`}
                    label={"Publish"}
                />
            </TitleContainer>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>Session story</h1>
            </div>
            <EditContainer>
                <DraftJSEditor
                    characterMentionList={characterMentionList}
                    readOnly={false}
                    JSONRef={storageRef?.child("SessionStory.json")}
                />
            </EditContainer>

            <h1>Session Images</h1>

            {isUploadingImages ? (
                <div
                    style={{
                        minHeight: "10rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <ImageUploader
                        key={ImageUploaderKey}
                        withIcon={true}
                        label="Max file size: 10mb, accepted: jpg|gif|png"
                        buttonText="Choose images"
                        onChange={(newImages: any) =>
                            setNewSessionImages([...newSessionImages, ...newImages])
                        }
                        imgExtension={[".jpg", ".gif", ".png"]}
                        maxFileSize={10485760}
                        withPreview={true}
                    />
                    <Button variant="contained" onClick={submitImages}>
                        Upload Pictures
          </Button>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "1rem",
                        }}
                    >
                        {existingSessionImages.map((img) => {
                            return (
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardActions
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                height: "2rem",
                                            }}
                                        >
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => removeImage(img)}
                                            >
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
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

const TitleContainer = styled.div`
  background-color: white;
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

const EditContainer = styled.div`
  width: 90%;
`;

export default CampaignSessionEdit;

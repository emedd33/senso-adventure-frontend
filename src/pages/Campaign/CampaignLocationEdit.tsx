import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    CardActionArea,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    makeStyles,
    Switch,
    TextField,
    TextFieldProps,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import DeleteIcon from "@material-ui/icons/Delete";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OLD_WHITE, OLD_WHITE_DARK } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "react-markdown-editor-lite/lib/index.css";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ClearIcon from "@material-ui/icons/Clear";
import useInterval from "../../store/hooks/useInterval";
import {
    getSelectedCampaign,
    getSelectedCampaignCharacterMentionList,
    getSelectedCampaignCharacters,
    getSelectedLocationDatabaseRef,
    getSelectedLocationStorageRef,
} from "../../store/selected/selectedSelectors";
import { getIsLoading } from "../../store/admin/adminSelectors";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";
import useSavedState from "../../store/hooks/useSavedState";
import { Link } from "react-router-dom";

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

const CampaignLocationEdit: React.FC = () => {
    const classes = useStyles();
    const selectedLocation = useSelector(
        (state: RootReducerProp) => state.selected.selectedLocation
    );
    const selectedCampaign = useSelector(getSelectedCampaign);

    const [isUploadingImages, setIsUploadingImages] = useState(false);
    const isLoading = useSelector(getIsLoading);
    const storageRef = useSelector(getSelectedLocationStorageRef);
    const databaseRef = useSelector(getSelectedLocationDatabaseRef);
    const campaignCharacters = useSelector(getSelectedCampaignCharacters)
    const [
        isPublished,
        setIsPublished,
        saveIsPublished,
        isSavedIsPublished,
    ] = useSavedState(selectedLocation?.location.isPublished === "TRUE");
    const [summary, setSummary, saveSummary, isSavedSummary] = useSavedState(
        selectedLocation?.location.summary
    );
    const [summaryError, setSummaryError] = useState(false);
    const [nickNames, setNickNames, saveNickNames, isSavedNickNames] = useSavedState(
        selectedLocation?.location.nickNames
            ? selectedLocation?.location.nickNames
            : []
    );
    const [newNickName, setNewNickName] = useState("");
    const [religion, setReligion, saveReligion, isSavedReligion] = useSavedState(
        selectedLocation?.location.religion
    );
    const [governRule, setGovernRule, saveGovernRule, isSavedGovernRule] = useSavedState(
        selectedLocation?.location.governRule
    );

    const [characters, setCharacters, saveCharacters, isSavedCharacters] = useSavedState(
        selectedLocation?.location.characters
            ? selectedLocation?.location.characters
            : []
    );
    const [newCharacter, setNewCharacter] = useState<{ character: ICharacter, role: string } | null>()
    const [newCharacterInputValue, setNewCharacterInputValue] = useState<string>("")
    const [newLocationImages, setNewLocationImages] = useState<any[]>([]);

    const [resources, setResources, saveResources, isSavedResources] = useSavedState(
        selectedLocation?.location.resources
            ? selectedLocation?.location.resources
            : []
    );
    const [newResource, setNewResource] = useState<{ name: string, description: string } | null>()
    const [resourceError, setResourceError] = useState(false);

    const [keyElements, setKeyElements, saveKeyElements, isSavedKeyElements] = useSavedState(
        selectedLocation?.location.keyElements
            ? selectedLocation?.location.keyElements
            : []
    );
    const [newKeyElement, setNewKeyElement] = useState<{ name: string, description: string } | null>()
    const [keyElementError, setKeyElementError] = useState(false);

    const [ImageUploaderKey, setImageUploaderKey] = useState(0);
    const [existingLocationImages, setExistingLocationImages] = useState<any[]>([]);
    const characterMentionList = useSelector(getSelectedCampaignCharacterMentionList)

    useEffect(() => {
        if (selectedLocation && storageRef) {
            storageRef
                .child("LocationImages")
                .listAll()
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        let name = itemRef.name;
                        itemRef
                            .getDownloadURL()
                            .then((url) => {
                                setExistingLocationImages((images) => {
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
                    console.log("Error fetching location images");
                });
        }

        return () => {
            setNewLocationImages([]);
            setExistingLocationImages([]);
        };
    }, [storageRef, selectedLocation]);

    useInterval(async () => {
        // Your custom logic here
        if (databaseRef) {
            if (!isSavedIsPublished) {
                saveIsPublished();
                databaseRef.child("isPublished").set(isPublished ? "TRUE" : "FALSE");
            }
            if (!isSavedSummary) {
                saveSummary();
                databaseRef.child("summary").set(summary);
            }
            if (!isSavedNickNames) {
                saveNickNames();
                databaseRef.child("nickNames").set(nickNames);
            }
            if (!isSavedReligion) {
                saveReligion();
                databaseRef.child("religion").set(religion);
            }
            if (!isSavedGovernRule) {
                saveGovernRule();
                databaseRef.child("governRule").set(governRule);
            }
            if (!isSavedCharacters) {
                saveCharacters();
                databaseRef.child("characters").set(characters);
            }
            if (!isSavedResources) {
                saveResources();
                databaseRef.child("resources").set(resources);
            }
            if (!isSavedKeyElements) {
                saveKeyElements();
                databaseRef.child("keyElements").set(keyElements);
            }

        }
    }, 1000);
    const submitImages = async () => {
        setIsUploadingImages(true);
        if (storageRef) {
            await Promise.all(
                newLocationImages.map((newImage) => {
                    let uploadTask = storageRef
                        .child("LocationImages")
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
                                setExistingLocationImages((images) => [
                                    ...images,
                                    { name: name, url: downloadURL },
                                ]);
                                return downloadURL;
                            });
                        }
                    );
                })
            ).then(() => {
                setNewLocationImages([]);
                setImageUploaderKey(ImageUploaderKey + 1);
                setIsUploadingImages(false);
            });
        }
    };
    const removeImage = (deleteImage: any) => {
        if (storageRef) {
            storageRef
                .child("LocationImages")
                .child(deleteImage.name)
                .delete()
                .then(() =>
                    setExistingLocationImages(
                        existingLocationImages.filter(
                            (existingImg) => existingImg !== deleteImage
                        )
                    )
                )
                .catch((e) => console.log("Could not remove image file", e));
        }
    };
    const renderCharacterAccordian = useCallback(
        (characters: { character: ICharacter, role: string }[]) =>
            characters ? characters.map((character: { character: ICharacter, role: string }, index: number) => {
                return (
                    <Accordion style={{ width: "90%", backgroundColor: "transparent", margin: "1rem" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: OLD_WHITE_DARK, }}>
                            <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                {character.character.name}
                            </Typography>
                            <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                {character.role}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                display: "grid",
                                gridTemplateColumns: "4fr 1fr",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>

                                {character.character.summary}
                            </div>
                            <Button color="primary" variant="outlined">
                                <DeleteIcon
                                    onClick={() => {
                                        setCharacters((existingCharacters: { role: string, character: ICharacter }[]) =>
                                            existingCharacters.filter(
                                                (existingCharacter: { role: string, character: ICharacter }) => existingCharacter !== character
                                            )
                                        )
                                    }}
                                    color="secondary"
                                />

                            </Button>

                        </AccordionDetails>
                        {selectedCampaign ?
                            <AccordionActions>
                                <Link
                                    to={`/${selectedCampaign.campaign.slug}/characters/${character.character.slug}`}
                                >
                                    <Button size="small" color="primary" variant="outlined" >
                                        <ArrowForwardIcon />
                                    </Button>
                                </Link>
                            </AccordionActions>
                            : null}
                    </Accordion>
                );
            }) : null,
        [setCharacters, selectedCampaign]
    );
    const renderResourceAccordian = useCallback(
        () =>
            resources ? resources.map((resource: { name: string, description: string }, index: number) => {
                return (
                    <Accordion style={{ width: "90%", backgroundColor: "transparent", margin: "1rem" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: OLD_WHITE_DARK }}>
                            <Typography>{resource.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                display: "grid",
                                gridTemplateColumns: "4fr 1fr",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {resource.description}

                            <Button color="primary" variant="outlined" style={{ width: "5rem" }}>
                                <DeleteIcon
                                    onClick={() =>
                                        setResources((existingResources: { name: string, description: string }[]) =>
                                            existingResources.filter(
                                                (existingResource: { name: string, description: string }) => existingResource !== resource
                                            )
                                        )
                                    }
                                    color="secondary"
                                />

                            </Button>

                        </AccordionDetails>
                    </Accordion >
                );
            }) : null,
        [setResources, resources]
    );
    const renderKeyElementsAccordian = useCallback(
        () =>
            keyElements ? keyElements.map((keyElement: { name: string, description: string }, index: number) => {
                return (
                    <Accordion style={{ width: "90%", backgroundColor: "transparent", margin: "1rem" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: OLD_WHITE_DARK }}>
                            <Typography>{keyElement.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                display: "grid",
                                gridTemplateColumns: "4fr 1fr",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {keyElement.description}

                            <Button color="primary" variant="outlined" style={{ width: "5rem" }}>
                                <DeleteIcon
                                    onClick={() =>
                                        setResources((existingResources: { name: string, description: string }[]) =>
                                            existingResources.filter(
                                                (existingResource: { name: string, description: string }) => existingResource !== keyElement
                                            )
                                        )
                                    }
                                    color="secondary"
                                />

                            </Button>

                        </AccordionDetails>
                    </Accordion >
                );
            }) : null,
        [setResources, keyElements]
    );
    if (isLoading || !selectedLocation) {
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
            <h1>{selectedLocation.location.name}</h1>

        Publish:
            <Switch
                checked={isPublished}
                onChange={(event: { target: { checked: any } }) => {
                    setIsPublished(event.target.checked);
                }}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
            />
            <div style={{ width: "100%", margin: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            margin: "0.3rem",
                            alignItems: "center"
                        }}
                    >
                        <h3>Also known as: </h3>
                        {nickNames
                            ? nickNames.map((nickName: string, index: number) => (
                                <Chip
                                    style={{ marginLeft: "0.2rem", backgroundColor: OLD_WHITE_DARK }}
                                    label={nickName}
                                    onDelete={() =>
                                        setNickNames(nickNames.length > 1 ? nickNames.splice(index, 1) : [])
                                    }
                                    variant="outlined"
                                />
                            ))
                            : null}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "1rem",
                            alignItems: "center",
                            margin: "0.3rem",
                        }}
                    >
                        <TextField
                            onKeyDown={(event) => {

                                if (newNickName && event.key === "Enter") {
                                    setNickNames((existingNickNames: string[]) => [
                                        ...existingNickNames,
                                        newNickName,
                                    ])
                                    setNewNickName("")
                                }
                            }

                            }
                            style={{ marginTop: "0.5rem", marginRight: "0.5rem", backgroundColor: OLD_WHITE_DARK }}
                            variant="outlined"
                            onChange={(event) => setNewNickName(event.target.value)}
                            label="Nick Names"
                            value={newNickName ? newNickName : ""}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ height: "2rem" }}
                            onClick={() => {
                                if (newNickName) {
                                    setNickNames((existingNickNames: string[]) => [
                                        ...existingNickNames,
                                        newNickName,
                                    ])
                                    setNewNickName("")
                                }
                            }
                            }
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <div>
                    <h2>Religion:</h2>  <TextField
                        style={{ width: "15rem" }}
                        label="Religion and/or Belief system"
                        value={religion ? religion : ""}
                        onChange={(event) => {
                            setReligion(event.target.value);
                        }}
                        variant="filled"
                    />
                </div>
                <div>
                    <h2>Govern rule:</h2>  <TextField
                        style={{ width: "100%" }}
                        label="How the city is goverend"
                        value={governRule ? governRule : ""}
                        onChange={(event) => {
                            setGovernRule(event.target.value);
                        }}
                        variant="filled"
                    />
                </div>
            </div>

            <TextField
                style={{ width: "100%" }}
                label="Summary"
                multiline
                rows={4}
                value={summary ? summary : ""}
                error={summaryError}
                onChange={(event) => {
                    if (event.target.value.length > 400) {
                        setSummaryError(true);
                    } else {
                        setSummaryError(false);
                        setSummary(event.target.value);
                    }
                }}
                defaultValue="Default Value"
                variant="filled"
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Characters in ${selectedLocation.location.name}`} </h1>
            </div>

            <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Autocomplete
                    id="combo-box-demo"
                    options={campaignCharacters ? campaignCharacters.map(([, character]: [string, ICharacter]) => ({ title: character.name, character: character })) : []}
                    getOptionLabel={(option: { title: any; }) => option.title}
                    style={{ width: "15rem" }}
                    onChange={(event: any, newValue: { title: string, character: ICharacter } | null) => {
                        if (newValue) {
                            setNewCharacter({ character: newValue?.character, role: "" });
                        } else {
                            setNewCharacter(undefined)
                        }
                    }}
                    inputValue={newCharacterInputValue}
                    onInputChange={(event, newInputValue) => {
                        setNewCharacterInputValue(newInputValue);
                    }}
                    renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} style={{ backgroundColor: OLD_WHITE_DARK }} label="Add Characters" variant="outlined" />}
                />
            </div>
            {newCharacter ?
                <>
                    <TextField
                        style={{ width: "100%" }}
                        label={`Role of ${newCharacter.character.name} in ${selectedLocation.location.name}`}
                        multiline
                        rows={2}
                        value={newCharacter ? newCharacter.role : ""}
                        onChange={(event) => {
                            setNewCharacter({ ...newCharacter, role: event.target.value });
                        }}
                        defaultValue=""
                        variant="filled"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: "2rem", margin: "1rem" }}
                        onClick={() => {
                            if (newCharacter) {
                                setCharacters((existingCharacters: ICharacter[]) => [
                                    ...existingCharacters,
                                    newCharacter,
                                ])
                                setNewCharacter(null)
                                setNewCharacterInputValue("")
                            }
                        }
                        }
                    >
                        Add
                        </Button>
                </>
                : null}

            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                {renderCharacterAccordian(characters)}
            </div>

            <Divider style={{ width: "100%", margin: "1rem" }} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Resources in ${selectedLocation.location.name}`} </h1>
            </div>

            <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <TextField
                    style={{ width: "15rem" }}
                    label="Name of the resource"
                    value={newResource ? newResource.name : ""}
                    onChange={(event) => setNewResource({ name: event.target.value, description: "" })}
                    defaultValue=""
                    error={resourceError}
                    variant="filled"
                />


                <Button
                    variant="contained"
                    color="primary"
                    style={{ height: "2rem", margin: "1rem" }}
                    onClick={() => {
                        if (newResource) {
                            setResources((existingResource: { name: string, description: string }[]) => [
                                ...existingResource,
                                newResource,
                            ])
                            setNewResource(null)
                        }
                    }
                    }
                >
                    Add
        </Button>
            </div>
            {newResource ?
                <TextField
                    style={{ width: "100%" }}
                    label="Description of the resource"
                    multiline
                    rows={4}
                    value={newResource ? newResource.description : ""}
                    error={resourceError}
                    onChange={(event) => {
                        if (event.target.value.length > 400) {
                            setResourceError(true);
                        } else {
                            setResourceError(false);
                            setNewResource({ name: newResource.name, description: event.target.value });
                        }
                    }}
                    defaultValue=""
                    variant="filled"
                />
                : null}

            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                {renderResourceAccordian()}
            </div>

            <Divider style={{ width: "100%", margin: "1rem" }} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1 style={{ flex: 2, textAlign: "center" }}>{`Key Elements in ${selectedLocation.location.name}`} </h1>
            </div>

            <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <TextField
                    style={{ width: "15rem" }}
                    label="Name of the the key element"
                    value={newKeyElement ? newKeyElement.name : ""}
                    onChange={(event) => setNewKeyElement({ name: event.target.value, description: "" })}
                    defaultValue=""
                    error={keyElementError}
                    variant="filled"
                />


                <Button
                    variant="contained"
                    color="primary"
                    style={{ height: "2rem", margin: "1rem" }}
                    onClick={() => {
                        if (newKeyElement && newKeyElement.name) {
                            setKeyElements((existingKeyElements: { name: string, description: string }[]) => [
                                ...existingKeyElements,
                                newKeyElement,
                            ])
                            setNewKeyElement(null)
                            setKeyElementError(false)
                        } else {
                            setKeyElementError(true)
                        }
                    }
                    }
                >
                    Add
        </Button>
            </div>
            {newKeyElement ?
                <TextField
                    style={{ width: "100%" }}
                    label="Description of the key element"
                    multiline
                    rows={4}
                    value={newKeyElement ? newKeyElement.description : ""}
                    onChange={(event) => {
                        if (event.target.value.length > 400) {
                            setResourceError(true);
                        } else {
                            setResourceError(false);
                            setNewKeyElement({ name: newKeyElement.name, description: event.target.value });
                        }
                    }}
                    defaultValue=""
                    variant="filled"
                />
                : null}

            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                {renderKeyElementsAccordian()}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                }}
            ></div>
            <h1 style={{ flex: 2, textAlign: "center" }}>Description and history</h1>
            <EditContainer>
                <DraftJSEditor
                    characterMentionList={characterMentionList}
                    readOnly={false}
                    JSONRef={storageRef?.child("LocationDescription.json")}
                />
            </EditContainer>

            <h1>Images</h1>

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
                            setNewLocationImages([...newLocationImages, ...newImages])
                        }
                        imgExtension={[".jpg", ".gif", ".png"]}
                        maxFileSize={10485760}
                        withPreview={true}
                    />
                    <Button variant="contained" onClick={submitImages} color="primary">
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
                        {existingLocationImages.map((img) => {
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

const EditContainer = styled.div`
  width: 90%;
  background-color:${OLD_WHITE_DARK};
`;

export default CampaignLocationEdit;

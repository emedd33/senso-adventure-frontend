import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { EditorState, convertToRaw, convertFromRaw, SelectionState } from "draft-js";
import { insertCharacter, insertAtomicBlock, insertImageBlock } from "./insertContent";
import Compressor from 'compressorjs';
import createToolbarPlugin, {
    Separator,
} from "@draft-js-plugins/static-toolbar";
import createImagePlugin from '@draft-js-plugins/image';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { handleKeyCommand, keyBindingFn } from "./handleKey";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import '@draft-js-plugins/image/lib/plugin.css';
import "draft-js/dist/Draft.css";
import "./SensoDraftJS.scss";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import createMentionPlugin, {
    defaultSuggestionsFilter,
    MentionData,
} from "@draft-js-plugins/mention";
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
} from "@draft-js-plugins/buttons";
import playerIcon from "../../assets/icons/character_icon.png";
import locationIcon from "../../assets/icons/location_icon.png";
import imageIcon from "../../assets/icons/image_icon.png";
import monsterIcon from "../../assets/icons/monster_icon.png";
import knowledgeIcon from "../../assets/icons/knowledge_icon.png";
import secretIcon from "../../assets/icons/hush_icon.png";
import descriptionIcon from "../../assets/icons/description_icon.png";
import {
    OLD_WHITE_DARK,
    OLD_WHITE_LIGHT,
} from "../../assets/constants/Constants";
import { Backdrop, Button, Tooltip } from "@material-ui/core";
import SensoDraftJSAtomic from "./SensoDraftJSAtomic";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedCampaignLocationMentionList,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignPlayerMentionList,
} from "../../store/selected/selectedSelectors";
import useInterval from "../../store/hooks/useInterval";
import { storage } from "../../services/Firebase/firebase";
import { setAlertDialog, setIsUploading } from "../../store/admin/adminCreator";
import { pushToStorage } from "../../services/Firebase/storage";
import CircularProgress from '@material-ui/core/CircularProgress';

type SensoDraftJSProps = {
    storagePath: string;
    readOnly: boolean;
    isDungeonMaster?: boolean;
    style?: React.CSSProperties;
};
const SensoDraftJS: React.FC<SensoDraftJSProps> = ({
    storagePath,
    readOnly,
    style,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const translate = useTranslation();
    const dispatch = useDispatch();
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );
    const [savedEditorState, setSavedEditorState] = useState<any>(editorState);
    const editor = useRef<Editor | null>(null);
    const inputFile = useRef(null)
    const [insertingImage, setInsertingImage] = useState<boolean>(false)
    const [playerOpen, setPlayerOpen] = useState(true);
    const [monsterOpen, setMonsterOpen] = useState(true);
    const [locationOpen, setLocationOpen] = useState(true);
    const [playerSuggestions, setPlayerSuggestions] = useState<MentionData[]>([]);
    const [monsterSuggestions, setMonsterSuggestions] = useState<MentionData[]>(
        []
    );
    const [locationSuggestions, setLocationSuggestions] = useState<MentionData[]>(
        []
    );

    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList);
    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList);
    const locationMentionList = useSelector(
        getSelectedCampaignLocationMentionList
    );
    const [
        plugins,
        Toolbar,
        InlineToolbar,
        PlayerMentionSuggestions,
        MonsterMentionSuggestions,
        LocationMentionSuggestions,
    ] = useMemo(() => {
        const staticToolbarPlugin = createToolbarPlugin();
        const focusPlugin = createFocusPlugin();
        const playerMentionPlugin = createMentionPlugin();
        const resizeablePlugin = createResizeablePlugin({});
        const blockDndPlugin = createBlockDndPlugin();
        const alignmentPlugin = createAlignmentPlugin();
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        const locationMentionPlugin = createMentionPlugin({
            mentionTrigger: "#",
        });
        const monsterMentionPlugin = createMentionPlugin({
            mentionTrigger: "$",
        });
        const decorator = composeDecorators(
            resizeablePlugin.decorator,
            alignmentPlugin.decorator,
            focusPlugin.decorator,
            blockDndPlugin.decorator
        );
        const imagePlugin = createImagePlugin({ decorator });
        const PlayerMentionSuggestions = playerMentionPlugin.MentionSuggestions;
        const MonsterMentionSuggestions = monsterMentionPlugin.MentionSuggestions;
        const LocationMentionSuggestions = locationMentionPlugin.MentionSuggestions;
        const InlineToolbar = inlineToolbarPlugin.InlineToolbar

        return [
            [
                imagePlugin,
                focusPlugin,
                resizeablePlugin,
                alignmentPlugin,
                blockDndPlugin,
                inlineToolbarPlugin,
                staticToolbarPlugin,
                playerMentionPlugin,
                locationMentionPlugin,
                monsterMentionPlugin,
            ],
            staticToolbarPlugin.Toolbar,
            InlineToolbar,
            PlayerMentionSuggestions,
            MonsterMentionSuggestions,
            LocationMentionSuggestions,
        ];
    }, []);

    const onPlayerOpenChange = useCallback((_open: boolean) => {
        setPlayerOpen(_open);
    }, []);
    const onPlayerSearchChange = useCallback(
        ({ value }: { value: string }) => {
            if (playerMentionList) {
                setPlayerSuggestions(
                    defaultSuggestionsFilter(value, playerMentionList)
                );
            }
        },
        [playerMentionList]
    );

    const onMonsterOpenChange = useCallback((_open: boolean) => {
        setMonsterOpen(_open);
    }, []);
    const onMonsterSearchChange = useCallback(
        ({ value }: { value: string }) => {
            if (monsterMentionList) {
                setMonsterSuggestions(
                    defaultSuggestionsFilter(value, monsterMentionList)
                );
            }
        },
        [monsterMentionList]
    );

    const onLocationOpenChange = useCallback((_open: boolean) => {
        setLocationOpen(_open);
    }, []);
    const onLocationSearchChange = useCallback(
        ({ value }: { value: string }) => {
            if (locationMentionList) {
                setLocationSuggestions(
                    defaultSuggestionsFilter(value, locationMentionList)
                );
            }
        },
        [locationMentionList]
    );
    const uploadImage = useCallback((image: File, selection: SelectionState) => {
        setInsertingImage(true)
        let uploadTask = storage
            .ref(storagePath)
            .child("images")
            .child(image.name)
            .put(image);
        uploadTask.on(
            "state_changed",
            () => { },
            (error) => {
                console.log(`Could not upload ${image}`, error);
                setInsertingImage(false)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setEditorState(insertImageBlock(downloadURL, selection, editorState))
                }).finally(() => setInsertingImage(false))
            }
        )
    }, [editorState, storagePath])
    const submitImages = useCallback((newImages: File[], selection: SelectionState) => {

        newImages.map(async (newImage: File) => {
            setInsertingImage(true)
            if (newImage.size / 1024 / 1024 > 1) {
                new Compressor(newImage, {
                    quality: 0.6,
                    success(result: File) {
                        if (result.size / 1024 / 1024 > 2) {
                            dispatch(setAlertDialog(`${translate.t(`Image is too large`)}`, true, true))
                        } else {

                            uploadImage(result, selection)
                        }
                    }
                })
            } else {
                uploadImage(newImage, selection)
            }
        })
    }, [uploadImage, translate, dispatch])
    const handleImageUpload = useCallback((e: any) => {
        const [file] = e.target.files;
        if (file) {
            submitImages([file], editorState.getSelection())
        }
    }, [editorState, submitImages]);
    const handleDroppedFiles = useCallback((selection: SelectionState, files: File[]) => {
        const filteredFiles = files.filter((file: File) => file.type.indexOf('image/') === 0); // <-- [1]

        if (!filteredFiles.length) {
            return "not-handled";
        }

        submitImages(filteredFiles, selection)
        return 'handled';
    }, [submitImages])
    useInterval(() => {
        if (!readOnly) {
            if (savedEditorState) {
                if (
                    JSON.stringify(editorState.getCurrentContent()) !==
                    JSON.stringify(savedEditorState.getCurrentContent())
                ) {
                    dispatch(setIsUploading(true));
                    let uploadedState = editorState;
                    var blob = new Blob(
                        [JSON.stringify(convertToRaw(uploadedState.getCurrentContent()))],
                        { type: "application/json" }
                    );
                    pushToStorage(storagePath + "/Content.json", blob, {})
                        .then(() => {
                            setSavedEditorState(uploadedState);
                        })
                        .catch((e: any) => {
                            console.log("Could not update session story", e);
                        })
                        .finally(() => dispatch(setIsUploading(false)));
                }
            }
        }
    }, 30000);
    useMemo(() => {
        storage
            .ref(storagePath + "/Content.json")
            .getDownloadURL()
            .then((url: string) =>
                fetch(url)
                    .then((res) => res.json())
                    .then((res) => {
                        let loadedEditorState = EditorState.createWithContent(
                            convertFromRaw(res)
                        );

                        setSavedEditorState(loadedEditorState);
                        setEditorState(loadedEditorState);
                        setIsLoading(false)
                    })
            )
            .catch((e: any) => {
                console.log("Could not fetch description from firebase");
                setIsLoading(false)
            });
        return () => {
            setSavedEditorState(undefined);
            setEditorState(EditorState.createEmpty());
            setPlayerSuggestions([]);
            setLocationSuggestions([]);
            setMonsterSuggestions([]);
        };
    }, [storagePath]);
    const focus = (): void => {
        editor.current?.focus();
    };


    const renderEditor = useCallback(() => {
        function blockStyleFn(contentBlock: any) {
            const type = contentBlock.getType();
            if (type === "atomic") {
                let initEntity = contentBlock.getEntityAt(0);
                if (initEntity) {
                    const entity = editorState.getCurrentContent().getEntity(initEntity);
                    return entity.getType();
                }
            }
            return "";
        }
        function myBlockRenderer(contentBlock: any) {
            const type = contentBlock.getType();
            if (type === "atomic") {
                return {
                    component: SensoDraftJSAtomic,
                    readOnly: readOnly,
                };
            }
            return null
        }


        return (
            <div
                style={
                    readOnly
                        ? { width: "100%" }
                        : { width: "100%", backgroundColor: OLD_WHITE_DARK }
                }
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleDroppedFiles={handleDroppedFiles}
                    handleKeyCommand={(e: any) =>
                        handleKeyCommand(e, editorState, setEditorState, storagePath, dispatch)
                    }
                    keyBindingFn={(e) => keyBindingFn(e, editorState)}
                    blockRendererFn={myBlockRenderer}
                    readOnly={readOnly}
                    blockStyleFn={blockStyleFn}
                    ref={(element) => {
                        editor.current = element;
                    }}
                    plugins={plugins}
                />
                <InlineToolbar >
                    {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
                            <InnlineToolbarContainer>



                                <HeadlineOneButton {...externalProps} />
                                <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} />
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />

                            </InnlineToolbarContainer>
                        )
                    }
                </InlineToolbar>
                {playerSuggestions ? (
                    <PlayerMentionSuggestions
                        open={playerOpen}
                        onOpenChange={onPlayerOpenChange}
                        suggestions={playerSuggestions}
                        onSearchChange={onPlayerSearchChange}
                    />
                ) : null}
                {locationSuggestions ? (
                    <LocationMentionSuggestions
                        open={locationOpen}
                        onOpenChange={onLocationOpenChange}
                        suggestions={locationSuggestions}
                        onSearchChange={onLocationSearchChange}
                    />
                ) : null}
                {monsterSuggestions ? (
                    <MonsterMentionSuggestions
                        open={monsterOpen}
                        onOpenChange={onMonsterOpenChange}
                        suggestions={monsterSuggestions}
                        onSearchChange={onMonsterSearchChange}
                    />
                ) : null}
            </div>
        );
    }, [
        dispatch,
        storagePath,
        LocationMentionSuggestions,
        MonsterMentionSuggestions,
        PlayerMentionSuggestions,
        plugins,
        InlineToolbar,
        editorState,
        playerOpen,
        playerSuggestions,
        locationOpen,
        locationSuggestions,
        handleDroppedFiles,
        onPlayerSearchChange,
        onLocationOpenChange,
        onLocationSearchChange,
        readOnly,
        onPlayerOpenChange,
        monsterOpen,
        monsterSuggestions,
        onMonsterOpenChange,
        onMonsterSearchChange,
    ]);
    if (isLoading){
        return <div style={{display:"flex", justifyContent:"center"}}>

        <CircularProgress/>
        </div>
    }
    if (!isLoading && readOnly && !editorState.getCurrentContent().hasText()){
        return null
    }
    return (
        <EditorContainer style={style ? style : {}}>

            {insertingImage ?
                <Backdrop open={true} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                : <>
                    {!readOnly ? (
                        <EditorHeader>
                            {!readOnly ? (
                                <Toolbar>
                                    {
                                        // may be use React.Fragment instead of div to improve perfomance after React 16
                                        (externalProps) => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Tooltip title={`${translate.t("To add player type")} @`}>
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(insertCharacter("@", editorState))
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={playerIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="New Character"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip
                                                    title={`${translate.t("To add monster/Npc type")} $`}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(insertCharacter("$", editorState))
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={monsterIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="New Character"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`${translate.t("To add location type")} #`}>
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(insertCharacter("#", editorState))
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={locationIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="New Character"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`${translate.t("Insert secret note")} `}>
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(
                                                                insertAtomicBlock("secret", editorState)
                                                            )
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={secretIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="Secret"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip
                                                    title={`${translate.t("Insert description block")} `}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(
                                                                insertAtomicBlock("description", editorState)
                                                            )
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={descriptionIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="Secret"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`${translate.t("Insert knowledge note")} `}>
                                                    <Button
                                                        onClick={() =>
                                                            setEditorState(insertAtomicBlock("note", editorState))
                                                        }
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={knowledgeIcon}
                                                            style={{ width: "2rem" }}
                                                            alt="Secret"
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`${translate.t("Insert image")} `}>
                                                    <Button
                                                        onClick={() => {
                                                            if (inputFile !== null) {
                                                                // @ts-ignore
                                                                inputFile!.current.click()
                                                            }
                                                        }}
                                                        style={{ width: "2rem" }}
                                                    >
                                                        {" "}
                                                        <img
                                                            src={imageIcon}
                                                            style={{ width: "2rem" }}
                                                            alt=""
                                                        />
                                                        <input type='file' id='file' accept="image/*" ref={inputFile} style={{ display: 'none' }} onChange={handleImageUpload} multiple={false} />

                                                    </Button>
                                                </Tooltip>


                                                <HeadlineOneButton {...externalProps} />
                                                <HeadlineTwoButton {...externalProps} />
                                                <HeadlineThreeButton {...externalProps} />
                                                <BoldButton {...externalProps} />
                                                <ItalicButton {...externalProps} />
                                                <UnderlineButton {...externalProps} />
                                                <Separator />
                                                <UnorderedListButton {...externalProps} />
                                                <OrderedListButton {...externalProps} />
                                            </div>
                                        )
                                    }
                                </Toolbar>

                            ) : null}
                        </EditorHeader>
                    ) : null}
                    <EditorBody onClick={focus}>{renderEditor()}</EditorBody>
                </>}
        </EditorContainer>
    );
};
const EditorHeader = styled.div`
  display: flex, 
  flex-direction: row;
  margin-bottom:1rem;
  justify-content: flex-start; 
  alignItems:center;
  width:100%;
  background-color:${OLD_WHITE_LIGHT};
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  `;
const EditorBody = styled.div`
  min-height: 10rem;
  padding: 1rem;
`;
const EditorContainer = styled.div`
  background-color: ${OLD_WHITE_DARK};
  z-index: 100;
  width: 100%;
`;
const InnlineToolbarContainer = styled.div`
position: fixed;
top: 2rem;
display:flex;
flex-direction:column;
-webkit-box-shadow: 5px 5px 15px 5px #000000;
box-shadow: 5px 0px 15px 2px #000000;,
`

export default SensoDraftJS;

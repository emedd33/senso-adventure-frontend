import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';

import Editor from "@draft-js-plugins/editor";
import { insertCharacter, insertAtomicBlock } from "./insertContent"
import '@draft-js-plugins/mention/lib/plugin.css';
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { handleKeyCommand, keyBindingFn } from "./handleKey"
import 'draft-js/dist/Draft.css';
import playerIcon from "../../assets/icons/character_icon.png"
import locationIcon from "../../assets/icons/location_icon.png"
import monsterIcon from "../../assets/icons/monster_icon.png"
import secretIcon from "../../assets/icons/hush_icon.png"
import descriptionIcon from "../../assets/icons/description_icon.png"
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
} from '@draft-js-plugins/buttons';
import { OLD_WHITE_DARK, OLD_WHITE_LIGHT } from '../../assets/constants/Constants';
import { Button, Tooltip } from '@material-ui/core';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import "./SensoDraftJS.scss"
import SensoDraftJSAtomic from './SensoDraftJSAtomic';
import { useTranslation } from 'react-i18next';
import createMentionPlugin, {
    defaultSuggestionsFilter, MentionData,
} from "@draft-js-plugins/mention";
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCampaignLocationMentionList, getSelectedCampaignMonsterMentionList, getSelectedCampaignPlayerMentionList } from '../../store/selected/selectedSelectors';
import useInterval from '../../store/hooks/useInterval';
import { storage } from '../../services/Firebase/firebase';
import { setIsUploading } from '../../store/admin/adminCreator';

type SensoDraftJSProps = {
    storagePath: string;
    readOnly: boolean;
    isDungeonMaster?: boolean
    style?: React.CSSProperties,
};
const SensoDraftJS: React.FC<SensoDraftJSProps> = ({ storagePath, readOnly, isDungeonMaster = false, style }) => {
    const dispatch = useDispatch()
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [savedEditorState, setSavedEditorState] = useState<any>(editorState);
    const editor = useRef<Editor | null>(null);
    const [playerOpen, setPlayerOpen] = useState(true);
    const [monsterOpen, setMonsterOpen] = useState(true);
    const [locationOpen, setLocationOpen] = useState(true);
    const [playerSuggestions, setPlayerSuggestions] = useState<MentionData[]>([]);
    const [monsterSuggestions, setMonsterSuggestions] = useState<MentionData[]>([]);
    const [locationSuggestions, setLocationSuggestions] = useState<MentionData[]>([]);
    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList)
    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList)
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList)


    const onPlayerOpenChange = useCallback((_open: boolean) => {
        setPlayerOpen(_open);
    }, []);
    const onPlayerSearchChange = useCallback(({ value }: { value: string }) => {
        if (playerMentionList) {
            setPlayerSuggestions(defaultSuggestionsFilter(value, playerMentionList));
        }
    }, [playerMentionList]);

    const onMonsterOpenChange = useCallback((_open: boolean) => {
        setMonsterOpen(_open);
    }, []);
    const onMonsterSearchChange = useCallback(({ value }: { value: string }) => {
        if (monsterMentionList) {
            setMonsterSuggestions(defaultSuggestionsFilter(value, monsterMentionList));
        }
    }, [monsterMentionList]);

    const onLocationOpenChange = useCallback((_open: boolean) => {
        setLocationOpen(_open);
    }, []);
    const onLocationSearchChange = useCallback(({ value }: { value: string }) => {
        if (locationMentionList) {
            setLocationSuggestions(defaultSuggestionsFilter(value, locationMentionList));
        }
    }, [locationMentionList]);
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
                    storage.ref(storagePath).put(blob)
                        .then(() => {
                            setSavedEditorState(uploadedState);
                        })
                        .catch((e: any) => {
                            console.log("Could not update session story", e);
                        })
                        .finally(() => dispatch(setIsUploading(false)))
                }

            }
        }
    }, 5000);
    const [plugins, Toolbar, PlayerMentionSuggestions, MonsterMentionSuggestions, LocationMentionSuggestions] = useMemo(() => {
        const staticToolbarPlugin = createToolbarPlugin();
        const playerMentionPlugin = createMentionPlugin();
        const locationMentionPlugin = createMentionPlugin({
            mentionTrigger: "#"
        });
        const monsterMentionPlugin = createMentionPlugin({
            mentionTrigger: "$"
        });

        const PlayerMentionSuggestions = playerMentionPlugin.MentionSuggestions;
        const MonsterMentionSuggestions = monsterMentionPlugin.MentionSuggestions;
        const LocationMentionSuggestions = locationMentionPlugin.MentionSuggestions;


        return [[staticToolbarPlugin, playerMentionPlugin, locationMentionPlugin, monsterMentionPlugin], staticToolbarPlugin.Toolbar, PlayerMentionSuggestions, MonsterMentionSuggestions, LocationMentionSuggestions];

    }, []);

    useMemo(() => {
        storage.ref(storagePath).getDownloadURL()
            .then((url: string) =>
                fetch(url)
                    .then((res) => res.json())
                    .then((res) => {
                        let loadedEditorState = EditorState.createWithContent(
                            convertFromRaw(res)
                        );

                        setSavedEditorState(loadedEditorState);
                        setEditorState(loadedEditorState);
                    })
            )
            .catch((e: any) => {
                console.log("Could not fetch description from firebase");
            });
        return () => {
            setSavedEditorState(undefined)
            setEditorState(EditorState.createEmpty())
            setPlayerSuggestions([])
            setLocationSuggestions([])
            setMonsterSuggestions([])
        }
    }, [storagePath]);
    const translate = useTranslation()



    const focus = (): void => {
        editor.current?.focus();
    };
    const renderEditor = useCallback(() => {


        function blockStyleFn(contentBlock: any) {
            const type = contentBlock.getType();
            if (type === 'atomic') {
                let initEntity = contentBlock.getEntityAt(0)
                if (initEntity) {
                    const entity = editorState.getCurrentContent().getEntity(initEntity);
                    return entity.getType();
                }
            }
            return ""
        }
        function myBlockRenderer(contentBlock: any) {
            const type = contentBlock.getType();
            if (type === 'atomic') {
                return {
                    component: SensoDraftJSAtomic,
                    readOnly: readOnly,
                };
            }
        }

        return <div
            style={readOnly ? { width: "100%" } : { width: "100%", backgroundColor: OLD_WHITE_DARK }}
        >


            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={(e: any) => handleKeyCommand(e, editorState, setEditorState)}
                keyBindingFn={(e) => keyBindingFn(e, editorState)}
                blockRendererFn={myBlockRenderer}
                readOnly={readOnly}
                blockStyleFn={blockStyleFn}
                ref={(element) => {
                    editor.current = element;
                }}
                plugins={plugins} />
            {
                playerSuggestions ?
                    <PlayerMentionSuggestions
                        open={playerOpen}
                        onOpenChange={onPlayerOpenChange}
                        suggestions={playerSuggestions}
                        onSearchChange={onPlayerSearchChange}
                    />
                    : null}
            {
                locationSuggestions ?
                    <LocationMentionSuggestions
                        open={locationOpen}
                        onOpenChange={onLocationOpenChange}
                        suggestions={locationSuggestions}
                        onSearchChange={onLocationSearchChange}
                    />
                    : null}
            {
                monsterSuggestions ?
                    <MonsterMentionSuggestions
                        open={monsterOpen}
                        onOpenChange={onMonsterOpenChange}
                        suggestions={monsterSuggestions}
                        onSearchChange={onMonsterSearchChange}
                    />
                    : null}
        </div >
    }
        , [LocationMentionSuggestions, MonsterMentionSuggestions, PlayerMentionSuggestions, plugins, editorState, playerOpen, playerSuggestions, locationOpen, locationSuggestions, onPlayerSearchChange, onLocationOpenChange, onLocationSearchChange, readOnly, onPlayerOpenChange, monsterOpen, monsterSuggestions, onMonsterOpenChange, onMonsterSearchChange])
    return (
        <EditorContainer>
            {!readOnly ?
                <EditorHeader >

                    {!readOnly ? <Toolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                    <Tooltip title={`${translate.t("To add player type")} @`}>
                                        <Button onClick={() => setEditorState(insertCharacter("@", editorState))} style={{ width: "2rem" }}> <img src={playerIcon} style={{ width: "2rem" }} alt="New Character" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`${translate.t("To add monster/Npc type")} $`}>
                                        <Button onClick={() => setEditorState(insertCharacter("$", editorState))} style={{ width: "2rem" }}> <img src={monsterIcon} style={{ width: "2rem" }} alt="New Character" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`${translate.t("To add location type")} #`}>
                                        <Button onClick={() => setEditorState(insertCharacter("#", editorState))} style={{ width: "2rem" }}> <img src={locationIcon} style={{ width: "2rem" }} alt="New Character" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`${translate.t('Insert secret note')} `}>
                                        <Button onClick={() => setEditorState(insertAtomicBlock("note", editorState))} style={{ width: "2rem" }}> <img src={secretIcon} style={{ width: "2rem" }} alt="Secret" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`${translate.t("Insert description block")} `}>
                                        <Button onClick={() => setEditorState(insertAtomicBlock("description", editorState))} style={{ width: "2rem" }}> <img src={descriptionIcon} style={{ width: "2rem" }} alt="Secret" />
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
                        : null}
                </EditorHeader>
                : null}
            <EditorBody onClick={focus}>
                {renderEditor()}

            </EditorBody>
        </EditorContainer>
    )
}
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
  `
const EditorBody = styled.div`
  min-height:10rem;
  padding: 1rem;
  
  `
const EditorContainer = styled.div`
  background-color:${OLD_WHITE_DARK};
  z-index:100;
  width:100%;
`

export default SensoDraftJS
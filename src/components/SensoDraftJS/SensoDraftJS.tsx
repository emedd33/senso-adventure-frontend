import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components';

import Editor from "@draft-js-plugins/editor";
import { insertCharacter, insertAtomicBlock } from "./insertContent"
import '@draft-js-plugins/mention/lib/plugin.css';
import { AtomicBlockUtils, DraftHandleValue, EditorState, RichUtils, genKey, Modifier, SelectionState } from "draft-js";
import { handleKeyCommand, keyBindingFn } from "./handleKey"
import 'draft-js/dist/Draft.css';
import playerIcon from "../../assets/icons/character_icon.png"
import locationIcon from "../../assets/icons/location_icon.png"
import monsterIcon from "../../assets/icons/monster_icon.png"
import secretIcon from "../../assets/icons/hush_icon.png"
import descriptionIcon from "../../assets/icons/description_icon.png"
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import { OLD_WHITE_DARK, OLD_WHITE_LIGHT } from '../../assets/constants/Constants';
import { Button, Tooltip } from '@material-ui/core';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import "./SensoDraftJS.scss"
import SensoDraftJSAtomic from './SensoDraftJSAtomic';
import { useTranslation } from 'react-i18next';
import createMentionPlugin, {
    defaultSuggestionsFilter, MentionData,
} from "@draft-js-plugins/mention";
import { useSelector } from 'react-redux';
import { getSelectedCampaignLocationMentionList, getSelectedCampaignMonsterMentionList, getSelectedCampaignPlayerMentionList } from '../../store/selected/selectedSelectors';

type SensoDraftJSProps = {
    storagePath: string;
    readOnly: boolean;
    isDungeonMaster?: boolean
    style?: React.CSSProperties,
};
const SensoDraftJS: React.FC<SensoDraftJSProps> = ({ storagePath, readOnly, isDungeonMaster = false, style }) => {
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

    const [plugins, InlineToolbar, PlayerMentionSuggestions, MonsterMentionSuggestions, LocationMentionSuggestions] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
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


        return [[inlineToolbarPlugin, playerMentionPlugin, locationMentionPlugin, monsterMentionPlugin], inlineToolbarPlugin.InlineToolbar, PlayerMentionSuggestions, MonsterMentionSuggestions, LocationMentionSuggestions];
    }, []);
    const translate = useTranslation()

    function myBlockRenderer(contentBlock: any) {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            return {
                component: SensoDraftJSAtomic,
                editable: true,
            };
        }
    }

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    console.log(editorState.getCurrentContent().getBlocksAsArray().map((e => e.getText())))
    console.log("OffSet", editorState.getSelection().getFocusOffset())



    function blockStyleFn(contentBlock: any) {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            let initEntity = contentBlock.getEntityAt(0)
            if (initEntity) {
                const entity = editorState.getCurrentContent().getEntity(initEntity);
                return entity.getType();
            }
        }
        return "aa"
    }
    const focus = (): void => {
        editor.current?.focus();
    };
    const renderEditor = useCallback(() => <div
        style={readOnly ? { width: "100%" } : { width: "100%", backgroundColor: OLD_WHITE_DARK }}
    >

        <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={(e: any) => handleKeyCommand(e, editorState, setEditorState)}
            keyBindingFn={(e) => keyBindingFn(e, editorState)}
            blockRendererFn={myBlockRenderer}
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
    </div >, [editorState, playerOpen, playerSuggestions, locationOpen, locationSuggestions, onPlayerSearchChange, onLocationOpenChange, onLocationSearchChange, readOnly, onPlayerOpenChange, monsterOpen, monsterSuggestions, onMonsterOpenChange, onMonsterSearchChange])
    return (
        <EditorContainer>
            <EditorHeader >
                <Tooltip title={`${translate.t("To add player type")} @`}>
                    <Button onClick={() => setEditorState(insertCharacter("@", editorState))} style={{ width: "3rem" }}> <img src={playerIcon} style={{ width: "inherit" }} alt="New Character" />
                    </Button>
                </Tooltip>
                <Tooltip title={`${translate.t("To add monster/Npc type")} $`}>
                    <Button onClick={() => setEditorState(insertCharacter("$", editorState))} style={{ width: "3rem" }}> <img src={monsterIcon} style={{ width: "inherit" }} alt="New Character" />
                    </Button>
                </Tooltip>
                <Tooltip title={`${translate.t("To add location type")} #`}>
                    <Button onClick={() => setEditorState(insertCharacter("#", editorState))} style={{ width: "3rem" }}> <img src={locationIcon} style={{ width: "inherit" }} alt="New Character" />
                    </Button>
                </Tooltip>
                <Tooltip title={`${translate.t('Insert secret note')} #`}>
                    <Button onClick={() => setEditorState(insertAtomicBlock("note", editorState))} style={{ width: "3rem" }}> <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
                    </Button>
                </Tooltip>
                <Tooltip title={`${translate.t("Insert description")} #`}>
                    <Button onClick={() => setEditorState(insertAtomicBlock("description", editorState))} style={{ width: "3rem" }}> <img src={descriptionIcon} style={{ width: "3rem" }} alt="Secret" />
                    </Button>
                </Tooltip>
            </EditorHeader>
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
  width:90%;
`

export default SensoDraftJS
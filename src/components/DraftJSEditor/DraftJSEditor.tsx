import React, { useCallback, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw, Modifier, AtomicBlockUtils, EditorBlock } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter, MentionData,
} from "@draft-js-plugins/mention";
import editorStyles from "./SimpleMentionEditor.module.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import useInterval from "../../store/hooks/useInterval";
import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import IsLoading from "../IsLoading/IsLoading";
import playerIcon from "../../assets/icons/character_icon.png"
import locationIcon from "../../assets/icons/location_icon.png"
import monsterIcon from "../../assets/icons/monster_icon.png"
import secretIcon from "../../assets/icons/hush_icon.png"
import descriptionIcon from "../../assets/icons/description_icon.png"
import { OLD_WHITE_DARK, OLD_WHITE_LIGHT } from "../../assets/constants/Constants";
import styled from "styled-components";
import sleep from "../../utils/sleep";
import { storage } from "../../services/Firebase/firebase";
import { SensoDescription } from "../SensoContainers";
import { useTranslation } from "react-i18next";
type DraftJSEditorProps = {
  storagePath: string;
  readOnly: boolean;
  isDungeonMaster?: boolean
  playerMentionList?: MentionData[]
  locationMentionList?: MentionData[]
  monsterMentionList?: MentionData[]
  style?: React.CSSProperties,

};
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
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

const plugins = [playerMentionPlugin, staticToolbarPlugin, locationMentionPlugin, monsterMentionPlugin];

const DraftJSEditor: React.FC<DraftJSEditorProps> = ({ storagePath, readOnly, isDungeonMaster = false, playerMentionList = [], locationMentionList = [], monsterMentionList = [], style }) => {
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [savedEditorState, setSavedEditorState] = useState<any>(editorState);
  const [playerOpen, setPlayerOpen] = useState(true);
  const translate = useTranslation()
  const [monsterOpen, setMonsterOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);
  const [playerSuggestions, setPlayerSuggestions] = useState(playerMentionList);
  const [monsterSuggestions, setMonsterSuggestions] = useState(monsterMentionList);
  const [locationSuggestions, setLocationSuggestions] = useState(playerMentionList);

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

  function insertCharacter(characterToInsert: string, editorState: EditorState) {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      characterToInsert
    );


    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');

    return newEditorState;
  }
  const insertSecretBlock = () => {

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "SECRET",
      "MUTABLE",
      { a: "b" }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
      ))
  }
  
  const insertDescriptionBlock = () => {

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "DESCRIPTION",
      "MUTABLE",
      { a: "b" }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
      ))
  }

  const blockRenderer = useCallback((contentBlock: { getType: () => any; }) => {
    const type = contentBlock.getType();
    if (type === "atomic" && isDungeonMaster) {
      return {
        component: AtomicComponents,
        editable: readOnly ? false : true,
      };
    }
  }, [isDungeonMaster, readOnly]);
  useInterval(() => {
    if (!readOnly) {
      if (savedEditorState) {
        if (
          JSON.stringify(editorState.getCurrentContent()) !==
          JSON.stringify(savedEditorState.getCurrentContent())
        ) {
          setIsUploading(true);
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
            });
        }
        sleep(2000).then(() => setIsUploading(false))
      }
    }
  }, 5000);

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

  const renderEditor = useCallback(() => <div
    className={editorStyles.editor}
    style={readOnly ? { width: "100%" } : { width: "100%", backgroundColor: OLD_WHITE_DARK }}
    onClick={() => {
      ref.current!.focus();
    }}
  >
    {
      readOnly ? null : (
        <>
          <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <Separator />
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <Separator />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
          <div style={{ width: "auto", height: "1rem" }}></div>
        </>
      )
    }
    < Editor
      editorKey={"editor"}
      editorState={editorState}
      onChange={setEditorState}
      plugins={plugins}
      ref={ref}
      readOnly={readOnly}
      blockRendererFn={blockRenderer}
    />
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
  </div >, [editorState, playerOpen, playerSuggestions, locationOpen, locationSuggestions, onPlayerSearchChange, onLocationOpenChange, onLocationSearchChange, readOnly, onPlayerOpenChange, blockRenderer, monsterOpen, monsterSuggestions, onMonsterOpenChange, onMonsterSearchChange])
  if (playerMentionList && !playerSuggestions) {
    return <IsLoading />
  }
  if (readOnly && !editorState.getCurrentContent().hasText()){
    return null
  }
  return (
    <Container style={style?style:{}}>
      {readOnly ? null :
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", width: "100%", padding: "0.3rem" }}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
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
              <Button onClick={() => insertSecretBlock()} style={{ width: "3rem" }}> <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
              </Button>
            </Tooltip>
             <Tooltip title={`${translate.t("Insert description")} #`}>
              <Button onClick={() => insertDescriptionBlock()} style={{ width: "3rem" }}> <img src={descriptionIcon} style={{ width: "3rem" }} alt="Secret" />
              </Button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>

            {isUploading ? <CircularProgress size={30} /> : null}
          </div>

        </div>
      }
      { renderEditor()}

    </Container>
  );
};

const Container = styled.div`
display:grid;
width:100%;
justify-items:start;
z-index:100;
`
const AtomicComponents = (props: any) => {
    
    const {block, contentState} = props;
    const initEntity = block.getEntityAt(0)
    if (initEntity){
      const entity = contentState.getEntity(initEntity);
      const type = entity.getType();
      switch (type){ 
        case"SECRET":
        return (
          <div style={{ backgroundColor: OLD_WHITE_LIGHT, borderRadius: "1rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Tooltip title="Secret note">
 
        <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
      </Tooltip>
      <EditorBlock {...props} />
    </div>
    )
    case"DESCRIPTION":
    return (
      <div style={{ backgroundColor: "#bdbdbd", borderRadius: "1rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <SensoDescription content={block.getText()}/>
      </div>
      )
      
      default:
        break      
      }
    }
    return null
    
};

export default DraftJSEditor;

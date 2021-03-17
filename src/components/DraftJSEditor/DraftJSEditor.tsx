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
import characterIcon from "../../assets/icons/character_icon.png"
import locationIcon from "../../assets/icons/location_icon.png"
import secretIcon from "../../assets/icons/hush_icon.png"
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
import styled from "styled-components";
import sleep from "../../utils/sleep";
type DraftJSEditorProps = {
  JSONRef: any | undefined;
  readOnly: boolean;
  isDungeonMaster?: boolean
  characterMentionList?: MentionData[]
  locationMentionList?: MentionData[]
};
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const characterMentionPlugin = createMentionPlugin();
const locationMentionPlugin = createMentionPlugin({
  mentionTrigger: "#"
});
const CharacterMentionSuggestions = characterMentionPlugin.MentionSuggestions;
const LocationMentionSuggestions = locationMentionPlugin.MentionSuggestions;

const plugins = [characterMentionPlugin, staticToolbarPlugin, locationMentionPlugin];

const DraftJSEditor: React.FC<DraftJSEditorProps> = ({ JSONRef, readOnly, isDungeonMaster = false, characterMentionList = [], locationMentionList = [] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [savedEditorState, setSavedEditorState] = useState<any>(editorState);
  const [characterOpen, setCharacterOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);
  const [characterSuggestions, setCharacterSuggestions] = useState(characterMentionList);
  const [locationSuggestions, setLocationSuggestions] = useState(characterMentionList);

  const onCharacterOpenChange = useCallback((_open: boolean) => {
    setCharacterOpen(_open);
  }, []);
  const onCharacterSearchChange = useCallback(({ value }: { value: string }) => {
    if (characterMentionList) {
      setCharacterSuggestions(defaultSuggestionsFilter(value, characterMentionList));
    }
  }, [characterMentionList]);

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

  const blockRenderer = useCallback((contentBlock: { getType: () => any; }) => {
    const type = contentBlock.getType();
    if (type === "atomic" && isDungeonMaster) {
      return {
        component: SecretComponent,
        editable: readOnly ? false : true,
      };
    }
  }, [isDungeonMaster, readOnly]);
  useInterval(() => {
    if (!readOnly) {
      if (JSONRef && savedEditorState) {
        if (
          JSON.stringify(editorState.getCurrentContent()) !==
          JSON.stringify(savedEditorState.getCurrentContent())
        ) {
          setIsUploading(true);
          let uploadedState = editorState;
          console.log("uploading")
          var blob = new Blob(
            [JSON.stringify(convertToRaw(uploadedState.getCurrentContent()))],
            { type: "application/json" }
          );
          JSONRef.put(blob)
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
    if (JSONRef) {
      JSONRef.getDownloadURL()
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
          console.log("Could not fetch character description from firebase");
        });
    }
    return () => {
      setSavedEditorState(undefined)
      setEditorState(EditorState.createEmpty())
      setCharacterSuggestions([])

    }
  }, [JSONRef]);

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
      characterSuggestions ?
        <CharacterMentionSuggestions
          open={characterOpen}
          onOpenChange={onCharacterOpenChange}
          suggestions={characterSuggestions}
          onSearchChange={onCharacterSearchChange}
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
  </div >, [editorState, characterOpen, characterSuggestions, locationOpen, locationSuggestions, onCharacterSearchChange, onLocationOpenChange, onLocationSearchChange, readOnly, onCharacterOpenChange, blockRenderer])
  if (characterMentionList && !characterSuggestions) {
    return <IsLoading />
  }
  return (
    <Container>
      {readOnly ? null :
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", width: "100%", padding: "0.3rem" }}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <Tooltip title="To add character type @">
              <Button onClick={() => setEditorState(insertCharacter("@", editorState))} style={{ width: "3rem" }}> <img src={characterIcon} style={{ width: "inherit" }} alt="New Character" />
              </Button>
            </Tooltip>
            <Tooltip title="To add location type #">
              <Button onClick={() => setEditorState(insertCharacter("#", editorState))} style={{ width: "3rem" }}> <img src={locationIcon} style={{ width: "inherit" }} alt="New Character" />
              </Button>
            </Tooltip>
            <Tooltip title="Insert secret note">
              <Button onClick={() => insertSecretBlock()} style={{ width: "3rem" }}> <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
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
`
const SecretComponent = (props: any) => {

  return (
    <div style={{ backgroundColor: "#bdbdbd", borderRadius: "1rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Tooltip title="Secret note">

        <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
      </Tooltip>
      <EditorBlock {...props} />
    </div>
  );
};


export default DraftJSEditor;

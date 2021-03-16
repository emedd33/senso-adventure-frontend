import React, { useCallback, useMemo, useRef, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
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
import { CircularProgress } from "@material-ui/core";
import IsLoading from "../IsLoading/IsLoading";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
type DraftJSEditorProps = {
  JSONRef: any | undefined;
  readOnly: boolean;
  characterMentionList?: MentionData[]
};
const mentionPlugin = createMentionPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, staticToolbarPlugin];

const DraftJSEditor: React.FC<DraftJSEditorProps> = ({ JSONRef, readOnly, characterMentionList }) => {
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [savedEditorState, setSavedEditorState] = useState<any>(editorState);
  const [open, setOpen] = useState(true);
  const [characterSuggestions, setCharacterSuggestions] = useState(characterMentionList);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    if (characterMentionList) {
      setCharacterSuggestions(defaultSuggestionsFilter(value, characterMentionList));

    }
  }, [characterMentionList]);
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
        } else {
          setIsUploading(false);
        }
      }
    }
  }, 10000);

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


  if (characterMentionList && !characterSuggestions) {
    return <IsLoading />
  }
  return (
    <div
      className={editorStyles.editor}
      style={readOnly ? { width: "100%" } : { width: "100%", backgroundColor: OLD_WHITE_DARK }}
      onClick={() => {
        ref.current!.focus();
      }}
    >
      {readOnly ? null : (
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
                  {isUploading ? <CircularProgress size={20} /> : null}
                </div>
              )
            }
          </Toolbar>
          <div style={{ width: "auto", height: "1rem" }}></div>
        </>
      )}
      <Editor
        editorKey={"editor"}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
        readOnly={readOnly}
      />
      {characterSuggestions ?
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={characterSuggestions}
          onSearchChange={onSearchChange}
        />
        : null}
    </div>
  );
};

export default DraftJSEditor;

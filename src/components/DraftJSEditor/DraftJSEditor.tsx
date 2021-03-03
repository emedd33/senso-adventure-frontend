import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import mentions from './Mentions';
import useInterval from '../../store/hooks/useInterval';
type DraftJSEditorProps = {
  JSONRef: any | undefined,
  readOnly: boolean

}
const DraftJSEditor: React.FC<DraftJSEditorProps> = ({ JSONRef, readOnly }) => {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [savedEditorState, setSavedEditorState] = useState<any>();

  useInterval(() => {
    if (!readOnly) {
      if (JSONRef && savedEditorState) {


        if (JSON.stringify(editorState.getCurrentContent()) !== JSON.stringify(savedEditorState.getCurrentContent())) {
          console.log("updatinf")
          let uploadedState = editorState
          var blob = new Blob([JSON.stringify(convertToRaw(uploadedState.getCurrentContent()))], { type: "application/json" })
          JSONRef
            .put(blob).then(() => {
              setSavedEditorState(uploadedState)
            }
            )
            .catch((e: any) => console.log("Could not update session story", e))
        }
      }
    }
  }, 1000)

  useEffect(() => {
    if (JSONRef) {
      JSONRef
        .getDownloadURL()
        .then((url: string) => fetch(url)
          .then(res => res.json())
          .then((res) => {
            let loadedEditorState = EditorState.createWithContent(convertFromRaw(res))

            setSavedEditorState(loadedEditorState)
            setEditorState(loadedEditorState)

          })
        )
        .catch((e: any) => { console.log("Could not fetch from firebase", e); setSavedEditorState(editorState) })
    }
  }, [JSONRef, editorState])


  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);


  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  return (
    <div
      className={editorStyles.editor}
      onClick={() => {
        ref.current!.focus();
      }}
    >
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
        readOnly={readOnly}

      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

export default DraftJSEditor
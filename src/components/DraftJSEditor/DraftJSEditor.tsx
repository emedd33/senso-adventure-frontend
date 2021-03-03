import React, {
  ReactElement,
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
import { getSelectedSessionStorageRef } from '../../store/selected/selectedSelectors';
import { useSelector } from 'react-redux';
type DraftJSEditorProps = {
  JSONRef: any | undefined
}
const DraftJSEditor: React.FC<DraftJSEditorProps> = ({ JSONRef }) => {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [savedEditorState, setSavedEditorState] = useState<any>();
  let options = {
    entityStyleFn: (entity: any) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'image') {
        const data = entity.getData();
        return {
          element: 'img',
          attributes: {
            src: data.src,
          },
          style: {
            // Put styles here...
          },
        };
      }
    },
  };
  const onExtractData = () => {
  };
  useInterval(() => {
    console.log(savedEditorState)
    if (JSONRef && savedEditorState) {
      // console.log(JSON.stringify(editorState.getCurrentContent()))
      if (JSON.stringify(editorState.getCurrentContent()) !== JSON.stringify(savedEditorState.getCurrentContent())) {

        setSavedEditorState(editorState)
        var blob = new Blob([savedEditorState], { type: "application/json" })
        console.log("uploading")
        // JSONRef
        //   .put(blob)
        //   .catch((e: any) => console.log("Could not update session story", e))
      } else {
        console.log("Equal")
      }
    }


  }, 3000)

  useEffect(() => {
    if (JSONRef) {
      JSONRef
        .getDownloadURL()
        .then((url: string) => fetch(url)
          .then(res => res.json())
          .then(text => console.log(text))
          // .then(blob => blob.text())
        )
        // .then(() => console.log(url)))
        // .then((json) => {
        //   console.log("json", json)
        //   let loadedEditorState = EditorState.createWithContent(convertFromRaw(json))
        //   setSavedEditorState(loadedEditorState)
        //   setEditorState(loadedEditorState)
        //   console.log("savedEditorState", savedEditorState)
        // }))
        .catch((e: any) => { console.log("could not fetch sesion story", e); setSavedEditorState(editorState) })

    }
  }, [])


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

      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          onExtractData()
        }}
      />
    </div>
  );
}

export default DraftJSEditor
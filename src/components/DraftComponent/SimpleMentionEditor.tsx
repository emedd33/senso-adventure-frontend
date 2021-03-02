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
import { stateToHTML } from 'draft-js-export-html';
import useInterval from '../../store/hooks/useInterval';
import { getSelectedSessionStorageRef } from '../../store/selected/selectedSelectors';
import { useSelector } from 'react-redux';

export default function SimpleMentionEditor(): ReactElement {
  const ref = useRef<Editor>(null);
  const storageRef = useSelector(getSelectedSessionStorageRef)

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
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
    console.log("hehhe")
    if (storageRef) {
      const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      var blob = new Blob([editorJSON], { type: "application/json" })

      // storageRef
      // .child("sessionStory.json")
      // .put(blob)
      // .catch(e => console.log("Could not update session story", e))
    }

  }, 3000)
  useEffect(() => {
    if (storageRef) {
      storageRef
        .child("sessionStory.json")
        .getDownloadURL()
        .then((url) => fetch(url)
          .then(res => res.json())
          .then((json) => {
            setEditorState(EditorState.createWithContent(convertFromRaw(json)))
          }))

    }
  }, [storageRef])


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
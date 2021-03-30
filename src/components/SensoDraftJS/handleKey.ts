import {
  convertToRaw,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import { pushToStorage } from "../../services/Firebase/storage";
import { setIsUploading } from "../../store/admin/adminCreator";
import { insertAtomicBlock } from "./insertContent";

const keyBindingFn = (e: any, editorState: EditorState) => {
  if (e.keyCode === 13) {
    let anchorKey = editorState.getSelection().getAnchorKey();
    let selectionType = editorState
      .getCurrentContent()
      .getBlockForKey(anchorKey)
      .getType();
    if (selectionType === "atomic") {
      return "atomic-enter";
    }
    return getDefaultKeyBinding(e);
  }
  if (e.keyCode === 8 /* `D` key */ && e.ctrlKey) {
    return "atomic-backspace";
  }
  if (e.keyCode === 83 /* `S` key */ && e.ctrlKey) {
    return "editor-save";
  }
  if (e.keyCode === 66 /* `B` key */ && e.ctrlKey) {
    return "editor-bold";
  }
  if (e.keyCode === 73 /* `I` key */ && e.ctrlKey) {
    return "editor-itallic";
  }
  if (e.keyCode === 74 /* `J` key */ && e.ctrlKey) {
    return "editor-note";
  }
  if (e.keyCode === 85 /* `U` key */ && e.ctrlKey) {
    return "editor-underline";
  }
  if (e.keyCode === 68 /* `D` key */ && e.ctrlKey) {
    return "editor-description";
  }

  return getDefaultKeyBinding(e);
};
const handleKeyCommand = (
  command: string,
  editorState: EditorState,
  setEditorState: any,
  storagePath?: string,
  dispatch?: any,
): DraftHandleValue => {
  if (command === "editor-bold") {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    return "handled";
  }
  if (command === "editor-itallic") {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    return "handled";
  }
  if (command === "editor-underline") {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    return "handled";
  }
  if (command === "atomic-enter") {
    return "handled";
  }
  if (command === "atomic-backspace") {
    return "handled";
  }

  if (command === "editor-description") {
    setEditorState(insertAtomicBlock("description", editorState));
    return "handled";
  }
  if (command === "editor-note") {
    setEditorState(insertAtomicBlock("note", editorState));
    return "handled";
  }
  if (command === "editor-save") {
    dispatch(setIsUploading(true))
    var blob = new Blob(
      [JSON.stringify(convertToRaw(editorState.getCurrentContent()))],
      { type: "application/json" }
    );
    pushToStorage(storagePath + "/CampaignLore.json", blob, {}).then(() => dispatch(setIsUploading(false)))
    return "handled";
  }

  return "not-handled";
};

export { keyBindingFn, handleKeyCommand };

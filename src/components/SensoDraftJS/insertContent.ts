import {
    AtomicBlockUtils,
    EditorState,
    Modifier,
    SelectionState,
} from "draft-js";

function insertCharacter(characterToInsert: string, editorState: EditorState) {
    const currentContent = editorState.getCurrentContent(),
        currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
    );

    let newEditorState = EditorState.push(
        editorState,
        newContent,
        "insert-characters"
    );
    const nextOffSet = editorState.getSelection().getFocusOffset() + 1;
    let newSelection = newEditorState.getSelection().merge({
        focusOffset: nextOffSet,
        anchorOffset: nextOffSet,
    });

    // Creates and sets the new editorState
    newEditorState = EditorState.forceSelection(newEditorState, newSelection);
    return newEditorState;
}
const insertAtomicBlock = (type: string, editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(type, "MUTABLE", {
        type: type,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
    });
    // Creates the new editorState with the atomic block
    newEditorState = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
    );
    // Creates new selection with current selection
    let currentKey = editorState.getSelection().getAnchorKey();
    let newKey = newEditorState
        .getCurrentContent()
        .getBlockAfter(currentKey)
        .getKey();
    let newSelection = SelectionState.createEmpty(newKey);

    // Moves coursor one offset into Atomic block
    const nextOffSet = newEditorState.getSelection().getFocusOffset() + 1;
    newSelection = newSelection.merge({
        focusOffset: nextOffSet,
        anchorOffset: nextOffSet,
    });

    // Creates and sets the new editorState
    newEditorState = EditorState.forceSelection(newEditorState, newSelection);
    return newEditorState;
};
const insertImageBlock = (url: string, selection: SelectionState, editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        "image",
        "IMMUTABLE",
        { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
    });
    // Creates the new editorState with the atomic block
    newEditorState = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
    );
    // Creates new selection with current selection
    let currentKey = selection.getAnchorKey();
    let newKey = newEditorState
        .getCurrentContent()
        .getBlockAfter(currentKey)
        .getKey();
    let newSelection = SelectionState.createEmpty(newKey);

    // Moves coursor one offset into Atomic block
    const nextOffSet = newEditorState.getSelection().getFocusOffset() + 1;
    newSelection = newSelection.merge({
        focusOffset: nextOffSet,
        anchorOffset: nextOffSet,
    });

    // Creates and sets the new editorState
    newEditorState = EditorState.forceSelection(newEditorState, newSelection);
    return newEditorState

}

export { insertCharacter, insertAtomicBlock, insertImageBlock };


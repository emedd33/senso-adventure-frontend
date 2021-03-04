import React from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Tooltip from "@material-ui/core/Tooltip";
import "quill/dist/quill.snow.css"; // Add css for snow theme
const StoryEditor = () => {
  const { quillRef, quill } = useQuill({
    modules: {
      toolbar: "#toolbar",
    },
    formats: [
      "bold",
      "italic",
      "underline",
      "strike",
      "align",
      "list",
      "indent",
      "size",
      "header",
      "link",
      "color",
      "background",
      "clean",
    ], // Important
  });

  // Insert Image(selected by user) to quill
  const insertSecretToEditor = () => {
    let selection = quill.getSelection();
    if (selection && selection.length > 0) {
      quill.formatText(selection.index, selection.length, {
        color: "#9965db",
        bold: true,
      });
    }
  };

  React.useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("ql-secret", insertSecretToEditor);
    }
  }, [quill]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div id="toolbar">
        <select className="ql-size">
          <option value="small" />
          <option selected />
          <option value="large" />
          <option value="huge" />
        </select>
        <Tooltip title="Secret message">
          <button className="ql-secret" onClick={insertSecretToEditor}>
            <VpnKeyIcon />
          </button>
        </Tooltip>
        <Tooltip title="Bold">
          <button className="ql-bold" />
        </Tooltip>

        <Tooltip title="Italic">
          <button className="ql-italic" />
        </Tooltip>
        <Tooltip title="Underline">
          <button className="ql-underline" />
        </Tooltip>
        <Tooltip title="Strike">
          <button className="ql-strike" />
        </Tooltip>
        <Tooltip title="Link">
          <button className="ql-link" />
        </Tooltip>
        <Tooltip title="Sub-text">
          <button className="ql-script" value="sub" />
        </Tooltip>
        <Tooltip title="Super-text">
          <button className="ql-script" value="super" />
        </Tooltip>
      </div>
      <div id="editor" />
      <div ref={quillRef} />
    </div>
  );
};

export default StoryEditor;

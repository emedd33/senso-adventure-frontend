import { ContentBlock, ContentState, EditorBlock } from "draft-js";
import React from "react";

const SensoDraftJSAtomic: React.FC<{ block: ContentBlock, contentState: ContentState }> = (props: { block: ContentBlock, contentState: ContentState }) => {
    // TODO: Add support for multiline atomic block
    return <div>
        <EditorBlock {...props} />
    </div>
}
export default SensoDraftJSAtomic
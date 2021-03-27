import { EditorBlock } from "draft-js";
import React from "react";

const SensoDraftJSAtomic: React.FC = (props: any) => {

    return <EditorBlock readOnly={props.blockProps.readOnly} {...props} />
}
export default SensoDraftJSAtomic
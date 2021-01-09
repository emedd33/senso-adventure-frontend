import { Spin } from "antd";
import React from "react";

export interface IsLoadingProps {

}

const IsLoading: React.FC<IsLoadingProps> = () => {
    return (
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <Spin />
        </div>
    )
}

export default IsLoading;
import { CircularProgress } from '@material-ui/core';
import React from "react";

export interface IsLoadingProps {

}

const IsLoading: React.FC<IsLoadingProps> = () => {
    return (
        <div style={{ alignItems: "center", justifyContent: "center", color: "white", display: "flex", height: "100vh" }}>
            <CircularProgress />
        </div>
    )
}

export default IsLoading;
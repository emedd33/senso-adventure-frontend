import { CircularProgress } from '@material-ui/core';
import React from "react";

export interface IsLoadingProps {

}

const IsLoading: React.FC<IsLoadingProps> = () => {
    console.log("isLoading")

    return (
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <CircularProgress color="secondary" />
        </div>
    )
}

export default IsLoading;
import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export interface IsLoadingProps {

}

const IsLoading: React.FC<IsLoadingProps> = () => {
    const history = useHistory()
    useEffect(() => {
        const timeoutID = window.setTimeout(() => {
            history.push("/")
        }, 5000);

        return () => window.clearTimeout(timeoutID);
    }, [history])
    return (
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <CircularProgress color="secondary" />
        </div>
    )
}

export default IsLoading;
import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export interface IsLoadingProps {}

const IsLoading: React.FC<IsLoadingProps> = () => {
  const history = useHistory();
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      history.push("/");
    }, 100000);

    return () => window.clearTimeout(timeoutID);
  }, [history]);
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "transparent",
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
};

export default IsLoading;

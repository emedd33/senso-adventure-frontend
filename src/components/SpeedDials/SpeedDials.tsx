import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import EditIcon from "@material-ui/icons/Edit";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { SpeedDialAction } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  })
);

export default function SpeedDials() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedCampaign = useSelector(
    (state: RootReducerProp) => state.selected.selectedCampaign
  );
  const [direction] = React.useState<SpeedDialProps["direction"]>("up");
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: "fixed", bottom: "0", right: "0", zIndex: 400 }}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          direction={direction}
        >
          <SpeedDialAction
            icon={<SpeedDialIcon />}
            tooltipTitle={"New Session"}
            onClick={() => {
              dispatch(
                dispatchSetSelectedSession({
                  id: "",
                  session: {
                    title: "",
                    subTitle: "",
                    story: "",
                    sessionDay: 1,
                    date: new Date().toDateString(),
                    campaign: selectedCampaign ? selectedCampaign.id : "",
                  },
                })
              );
              history.push("/campaign/session/edit");
            }}
          />
          <SpeedDialAction
            icon={<EditIcon />}
            tooltipTitle={"Edit campaign"}
            onClick={() => history.push("/editcampaign")}
          />
        </SpeedDial>
      </div>
    </div>
  );
}

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchSetSelectedSession } from '../../store/selected/selectedCreators';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        exampleWrapper: {
            position: 'relative',
            marginTop: theme.spacing(3),
            height: 380,
        },
        speedDial: {
            position: 'absolute',
            '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
                bottom: theme.spacing(2),
                right: theme.spacing(2),
            },
            '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
                top: theme.spacing(2),
                left: theme.spacing(2),
            },
        },
    }),
);


export default function SpeedDials() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div style={{ position: "fixed", bottom: "0", right: "0", zIndex: 400 }}>
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >

                    <SpeedDialAction
                        key={"addSession"}
                        icon={<AddCircleOutlineIcon />}
                        tooltipTitle={"Add new session"}
                        onClick={() => {
                            dispatch(dispatchSetSelectedSession({
                                session: {
                                    title: "",
                                    story: "",
                                    date: "",
                                    campaign: selectedCampaign ? selectedCampaign.id : ""
                                }
                            }));
                            history.push("/campaign/edit")
                        }}
                    />

                </SpeedDial>
            </div>
        </div>
    );
}

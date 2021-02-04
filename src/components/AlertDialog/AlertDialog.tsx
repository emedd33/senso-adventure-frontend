import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertDialog } from '../../store/admin/adminCreator';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const error = useSelector((state: RootReducerProp) => state.admin.error)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setAlertDialog("", false, false));
    };

    return (
        <div style={{}}>
            <Dialog
                open={error.isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {error.isError ?
                    <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle> :
                    null
                }
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
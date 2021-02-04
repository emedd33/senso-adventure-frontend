import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Confetti from "react-confetti";
import px2vw from "../../utils/px2vw";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type ConfirmDialogProps = {
  title: string;
  content: string;
  handleConfirm: any;
  open: boolean;
  handleClose?: any;
  isActionsAvailable: boolean;
  confetti: boolean;
};

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({
  title,
  content,
  handleConfirm,
  handleClose,
  open,
  isActionsAvailable,
  confetti,
}) => {
  const height = px2vw(200) !== undefined ? parseInt(px2vw(2000)) : 200;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {" "}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {confetti ? <Confetti width={height * 2} height={height} /> : null}
      </div>
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      {isActionsAvailable ? (
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Agree
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
export default ConfirmDialog;

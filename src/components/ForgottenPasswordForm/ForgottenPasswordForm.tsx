import { OLD_WHITE } from "../../assets/constants/Constants";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { setAlertDialog } from "../../store/admin/adminCreator";
import { resetPassword } from "../../services/Firebase/authentication";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: OLD_WHITE,
    padding: "1rem",
    webkitBoxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
    mozBoxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
    boxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
  },
  login: {
    textTransform: "none",
  },
}));
export interface SignUpProps {}

const ForgottenPasswordForm: React.FC<SignUpProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleSubmit = () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    resetPassword(email, dispatch)
      .then(function () {
        dispatch(
          setAlertDialog(
            "Email to reset password has been sent to ".concat(email),
            false,
            true
          )
        );
      })
      .catch(function (error) {
        dispatch(
          setAlertDialog(
            "Email adress '".concat(email).concat("' is invalid"),
            true,
            true
          )
        );
      });
  };
  useEffect(() => {
    if (email.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ margin: "1rem" }}>
          Reset password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              error={emailError}
              id="email"
              label="Email Address"
              name="email"
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleSubmit()}
          disabled={isButtonDisabled}
        >
          Reset password
        </Button>
      </div>
    </Container>
  );
};

export default ForgottenPasswordForm;

import { OLD_WHITE } from "../../assets/constants/Constants";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlertDialog, setIsLoading } from "../../store/admin/adminCreator";
import { getAuthUser } from "../../store/admin/adminSelectors";
import { getFromDatabase } from "../../services/Firebase/database"
import { createUserWithEmailPasswordAndUsername } from "../../services/Firebase/authentication";
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
  },
  login: {
    textTransform: "none",
  },
}));
export interface SignUpProps { }

const SignupForm: React.FC<SignUpProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstPasswordError, setfirstPasswordError] = useState(false);
  const [secondPasswordError, setSecondPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState(
    ""
  );
  const authUser = useSelector(getAuthUser)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleSignup = () => {
    !username ? setUsernameError(true) : setUsernameError(false);
    !firstPassword ? setfirstPasswordError(true) : setfirstPasswordError(false);
    !secondPassword
      ? setSecondPasswordError(true)
      : setSecondPasswordError(false);
    !email ? setEmailError(true) : setEmailError(false);
    if (username && firstPassword && email) {
      if (firstPassword !== secondPassword) {
        setConfirmPasswordHelperText("Passwords are not equal");
        setSecondPasswordError(true);
        return;
      }
      dispatch(setIsLoading(true))
      getFromDatabase("admin/usernames").then(function (snapshot) {

        if (snapshot && Object.values(snapshot.val()).includes(username)) {
          dispatch(setAlertDialog("Username already exists", true, true))
        } else {
          createUserWithEmailPasswordAndUsername(email, firstPassword, username).then(() => {
            history.push("/user/" + username)
            dispatch(setIsLoading(false))
          })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                dispatch(setAlertDialog("Email already exists", true, true))
              }
              else {
                console.log(error)
                dispatch(setAlertDialog("an error has occured", true, true))
              }
              dispatch(setIsLoading(false))
            })
        }
      }).catch(() => dispatch(setIsLoading(false)))
    }
  };
  useEffect(() => {
    if (
      username.trim() &&
      email.trim() &&
      firstPassword.trim() &&
      secondPassword.trim()
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, firstPassword, secondPassword, email]);
  if (authUser && authUser.displayName) {
    return <Redirect to="/" />
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
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
                onKeyDown={(e) => (e.key === "Enter" ? handleSignup() : null)}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                error={usernameError}
                label="Username"
                name="username"
                autoComplete="username"
                onKeyDown={(e) => (e.key === "Enter" ? handleSignup() : null)}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={firstPasswordError}
                name="password"
                label="Password"
                type="password"
                onKeyDown={(e) => (e.key === "Enter" ? handleSignup() : null)}
                id="first-password"
                onChange={(event) => setFirstPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm password"
                type="password"
                id="second-password"
                error={secondPasswordError}
                onKeyDown={(e) => (e.key === "Enter" ? handleSignup() : null)}
                helperText={confirmPasswordHelperText}
                onChange={(event) => setSecondPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignup()}
            disabled={isButtonDisabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={"/login"}>
                <Button
                  color="secondary"
                  size="medium"
                  className={classes.login}
                >
                  Already have an account? Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;

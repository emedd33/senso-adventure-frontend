import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { Link } from "react-router-dom";
import { dispatchLogin } from "../../store/admin/adminCreator";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: "20rem",
      height: "30rem;",
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      margin: "1rem",
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: OLD_WHITE,
    },
    card: {
      marginTop: theme.spacing(10),
      background: OLD_WHITE,
    },
    actions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch",
    },
    link: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  })
);

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const translate = useTranslation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);
  const handleLogin = async () => {
    if (!email || !password) {
      setHelperText("Please type in your email and password");
      setIsError(true);
    } else {
      dispatch(dispatchLogin({ email: email, password: password }));
    }
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={translate.t(`Login`)} />
        <CardContent>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="email"
              type="email"
              label={translate.t(`Email`)}
              margin="normal"
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : null)}
            />
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="password"
              label={translate.t(`Password`)}
              margin="normal"
              helperText={helperText}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : null)}
            />
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={() => handleLogin()}
            disabled={isButtonDisabled}
          >
            {translate.t(`Login`)}
          </Button>
          <Link to={"/login/forgotten"} className={classes.link}>
            <Button color="secondary" size="medium">
              {translate.t(`Forgotten password?`)}
            </Button>
          </Link>
          <Link to={"/login/signup"} className={classes.link}>
            <Button color="secondary" size="medium">
              {translate.t(`Signup`)}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
};

export default LoginForm;

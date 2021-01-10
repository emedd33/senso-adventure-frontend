import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { OLD_WHITE } from '../../assets/styles/colors';
import { useDispatch } from 'react-redux';
import { SET_IS_LOADING } from '../../store/admin/adminActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      webkitBoxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
      mozBoxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
      boxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)",
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      margin: "1rem"
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: OLD_WHITE,
    },
    card: {
      marginTop: theme.spacing(10),
      background: OLD_WHITE
    },
    actions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch"
    },
    link: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex"
    }

  })
);





const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [helperText, setHelperText] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [username, password]);
  const handleLogin = () => {
    if (!username || !password) {
      setHelperText("Please type in your username and password")
      setIsError(true)
    } else {
      dispatch({ type: SET_IS_LOADING, payload: true })
    }
  }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login" />
        <CardContent>
          <div>
            <TextField
              error={isError}
              fullWidth
              id="username"
              type="email"
              color="secondary"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={e => e.key === 'Enter' ? handleLogin() : null}
            />
            <TextField
              error={isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              color="secondary"
              placeholder="Password"
              margin="normal"
              helperText={helperText}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={e => e.key === 'Enter' ? handleLogin() : null}
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
            disabled={isButtonDisabled}>
            Login
          </Button>
          <Link to={"/login/signup"} className={classes.link}>

            <Button color="secondary" size="medium">
              Or sign up
            </Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
}


export default LoginForm;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GithubIcon from "../../assets/icons/github.png"
const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    color: "white",
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <div style={{ display: "flex", justifyContent: "center" }}>

          <Link href={"https://github.com/emedd33/senso-adventure-frontend"} style={{ width: "5rem", height: "5rem", marginRight: "2rem" }} >

            <span>

              <img src={GithubIcon} alt="Github repo" style={{ width: "5rem", height: "5rem" }} />
            </span>
          </Link>


          <div>
            <Typography variant="body1">Eskild Ruud Mageli</Typography>
            <Typography variant="body1">eskild.emedd33@gmail.com</Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
}
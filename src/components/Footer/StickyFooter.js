import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import GithubIcon from "../../assets/icons/github.png";
import { LIGHT_PINK } from "../../assets/constants/Constants";
const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "1rem",
    color: "white",
    backgroundColor: LIGHT_PINK,
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            href={"https://github.com/emedd33/senso-adventure-frontend"}
            style={{ width: "5rem", height: "5rem", marginRight: "2rem" }}
          >
            <span>
              <img
                src={GithubIcon}
                alt="Github repo"
                style={{ width: "5rem", height: "5rem" }}
              />
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

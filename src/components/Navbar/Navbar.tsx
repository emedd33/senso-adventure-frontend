import React, { FunctionComponent, useState } from "react";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import NavbarHeader from "./NavbarHeader"
import NavbarSidebar from "./NavbarSidebar"

import {
  Backdrop,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import IsLoading from "../IsLoading/IsLoading";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

type NavbarProps = {};
const Navbar: FunctionComponent<NavbarProps> = () => {
  const classes = useStyles();
  const rootCampaigns = useSelector(
    (state: RootReducerProp) => state.rootCampaigns
  );
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const showSidebar = () => setIsNavbarOpen(!isNavbarOpen);

  if (!rootCampaigns) {
    return <IsLoading />;
  }
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <NavbarHeader showSidebar={showSidebar} />
        <Backdrop
          className={classes.backdrop}
          open={isNavbarOpen}
          onClick={showSidebar}
        >
          <NavbarSidebar isOpen={isNavbarOpen} />
        </Backdrop>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;

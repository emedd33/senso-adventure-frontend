import React, { FunctionComponent } from "react";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import NavbarHeader from "./NavbarHeader";
import NavbarSidebar from "./NavbarSidebar";

import { Backdrop, createStyles, makeStyles, Theme } from "@material-ui/core";
import IsLoading from "../IsLoading/IsLoading";
import { setIsSidebarShown } from "../../store/admin/adminCreator";
import { getIsSidebarShown } from "../../store/admin/adminSelectors";
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
  const dispatch = useDispatch();
  const rootCampaigns = useSelector(
    (state: RootReducerProp) => state.rootCampaigns
  );
  const isSidebarOpen = useSelector(getIsSidebarShown);
  if (!rootCampaigns) {
    return <IsLoading />;
  }
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <NavbarHeader />
        <Backdrop
          className={classes.backdrop}
          open={isSidebarOpen}
          onClick={() => dispatch(setIsSidebarShown(!isSidebarOpen))}
        >
          {isSidebarOpen ? <NavbarSidebar /> : null}
        </Backdrop>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;

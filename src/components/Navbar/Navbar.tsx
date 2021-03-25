import React, { FunctionComponent, useState } from "react";
import "./Navbar.css";
import { IconContext } from "react-icons";
import styled from "styled-components";
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
import { LIGHT_PINK } from "../../assets/constants/Constants";
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
const Title = styled.h2`
margin-left: 2vh;
  width: 15rem;
  `;
const CampaignTitle = styled.h1`
padding;0;
margin:0;
width:100%;
margin-left:2vw;
:hover {
    color: #ed1212;
    cursor: pointer;
}
color:black;
`;
const NavBarItem = styled.ul`
  background-color: ${LIGHT_PINK};
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0;
`;
export default Navbar;

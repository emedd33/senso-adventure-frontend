import React, { FunctionComponent, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HomeCrest from "../../assets/icons/home_crest.png";
import "./Navbar.css";
import { IconContext } from "react-icons";
import styled from "styled-components";
import MenuListComposition from "../MenuList/MenuList";
import CampaignCrest from "../../assets/icons/CampaignCrest.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCampaign,
  setSelectedCampaign,
} from "../../store/selected/selectedCreators";
import {
  Backdrop,
  Breadcrumbs,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useWindowSize from "../../store/hooks/useWindowSize";
import IsLoading from "../IsLoading/IsLoading";
import { LIGHT_PINK } from "../../assets/constants/Constants";
import { initialSelectedCampaignState } from "../../store/selected/selectedReducer";
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
  const size = useWindowSize();
  const location = useLocation();
  const dispatch = useDispatch();
  const urlPathArray = location.pathname.split("/");
  if (urlPathArray.length === 2 && urlPathArray[0] === urlPathArray[1]) {
    urlPathArray.pop();
  }
  const rootCampaigns = useSelector(
    (state: RootReducerProp) => state.rootCampaigns
  );
  const authUser = useSelector(
    (state: RootReducerProp) => state.admin.authUser
  );
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  if (!rootCampaigns) {
    return <IsLoading />;
  }
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <NavBarHeader>
          <div
            style={{
              height: "5rem",
              flex: "3",
              display: "flex",
              alignItems: "center",
            }}
          >
            <NavBarOpenIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavBarOpenIcon>
            <Link
              to="/"
              onClick={() => setSidebar(false)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span>
                <Title>Senso Adventure</Title>
              </span>
            </Link>
            <div
              style={{
                display: "flex",
                height: "5rem",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              {size.width && size.width! > 769 ? (
                <Breadcrumbs aria-label="breadcrumb">
                  {urlPathArray.map((path: string, index: any) => {
                    let crumb = path.charAt(0).toUpperCase() + path.slice(1);
                    let linkPath = urlPathArray.slice(0, index + 1).join("/");
                    linkPath = !linkPath ? "/" : linkPath;
                    if (urlPathArray.length - 1 !== index) {
                      return (
                        <Link
                          to={linkPath}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          key={index}
                        >
                          {crumb}
                        </Link>
                      );
                    } else {
                      return (
                        <Typography
                          color="textPrimary"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            opacity: 0.5,
                          }}
                          key={index}
                        >
                          {crumb}
                        </Typography>
                      );
                    }
                  })}
                </Breadcrumbs>
              ) : null}
            </div>
          </div>
          <MenuListComposition />
        </NavBarHeader>
        <Backdrop
          className={classes.backdrop}
          open={sidebar}
          onClick={showSidebar}
        >
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul
              style={{ width: "100%", paddingLeft: "1rem" }}
              onClick={showSidebar}
            >
              <div className={"cos-navbar-container"}>
                <NavBarItem>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={HomeCrest}
                        alt={"Curse of strahd"}
                        style={{ width: "3rem", height: "3rem" }}
                      />
                      <CampaignTitle>Home</CampaignTitle>
                    </span>
                  </Link>
                </NavBarItem>
                {Object.entries(rootCampaigns.campaigns).map(
                  ([id, campaign]) => {
                    return (
                      <NavBarItem
                        onClick={() =>
                          dispatch(
                            setSelectedCampaign({
                              id: "",
                              campaign: initialSelectedCampaignState,
                            })
                          )
                        }
                      >
                        <Link
                          to={`/${campaign.slug}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              padding: "1rem",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ width: "3rem", height: "2rem" }}
                              src={CampaignCrest}
                              alt="Crest symbol"
                            />
                            <CampaignTitle>{campaign.title}</CampaignTitle>
                          </span>
                        </Link>
                      </NavBarItem>
                    );
                  }
                )}

                {authUser ? (
                  <NavBarItem>
                    <Link
                      to="/newcampaign"
                      onClick={() => dispatch(clearSelectedCampaign())}
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        style={{
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textTransform: "none",
                        }}
                      >
                        <AddIcon style={{ color: "black" }} />
                        <CampaignTitle>Add new</CampaignTitle>
                      </span>
                    </Link>
                  </NavBarItem>
                ) : null}
              </div>
            </ul>
          </nav>
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
const NavBarHeader = styled.div`
  background-color: #ab9696;
  width: 100%;
  height: 5rem;
  display: flex;
  position: fixed;
  justify-content: start;
  align-items: center;
  box-shadow: 5px 0px 15px 2px #000000;
  z-index: 450;
`;
const NavBarOpenIcon = styled(Link)`
  margin-left: 2rem;
  marin-ritgh: 2rem;
  background: none;
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

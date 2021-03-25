import React, { FunctionComponent, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import HomeCrest from "../../assets/icons/home_crest.png";
import "./Navbar.css";
import { IconContext } from "react-icons";
import styled from "styled-components";
import MenuListComposition from "../MenuList/MenuList";
import CampaignCrest from "../../assets/icons/CampaignCrest.png";
import { useDispatch, useSelector } from "react-redux";
import useOwner from "../../store/hooks/useOwner"
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IsLoading from "../IsLoading/IsLoading";
import { LIGHT_PINK } from "../../assets/constants/Constants";
import { initialSelectedCampaignState } from "../../store/selected/selectedReducer";
import { getAuthUser } from "../../store/admin/adminSelectors";
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
  const authUser = useSelector(getAuthUser);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const owner = useOwner()

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
                        alt={"Home"}
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
                        key={id}
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
                          to={`/user/${authUser.displayName}/campaigns/${campaign.slug}`}
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

                {authUser && authUser.displayName === owner ? (
                  <NavBarItem>
                    <Link
                      to={`/user/${authUser.displayName}/newcampaign`}
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

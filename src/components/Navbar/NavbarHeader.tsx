import React, { FunctionComponent } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import styled from "styled-components";
import engIcon from "../../assets/icons/eng_icon.png";
import norIcon from "../../assets/icons/nor_icon.png";

import NavbarHeaderBreadCrumbs from "./NavbarHeaderBreadCrumbs";

import { useDispatch, useSelector } from "react-redux";
import { setIsSidebarShown } from "../../store/admin/adminCreator";
import { Button, CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getAuthUser, getIsUploading } from "../../store/admin/adminSelectors";
import useWindowSize from "../../store/hooks/useWindowSize";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type NavbarHeaderProps = {};
const NavbarHeader: FunctionComponent<NavbarHeaderProps> = () => {
  const translate = useTranslation();
  const size = useWindowSize();
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const isUploading = useSelector(getIsUploading);
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <Container>
          <div
            style={{
              height: "5rem",
              flex: "3",
              display: "flex",
              alignItems: "center",
            }}
          >
            <NavBarOpenIcon to="#">
              <FaIcons.FaBars
                onClick={() => dispatch(setIsSidebarShown(true))}
              />
            </NavBarOpenIcon>

            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span>
                <Title>Senso Adventure</Title>
              </span>
            </Link>
            <NavbarHeaderBreadCrumbs />
          </div>
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "4rem",
            }}
          >
            {isUploading ? <CircularProgress size={20} /> : null}
            <Link
              to={authUser ? "/profile" : "/login"}
              style={{
                textDecoration: "none",
                color: "black",
                textTransform: "none",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {authUser ? <>
                  <p style={{ marginRight: "0.5rem" }}>{authUser.displayName} </p><AccountCircleIcon />
                </> : translate.t("Login")}
              </span>
            </Link>
          </div>
          {size.width && size.width! > 769 ?
            <div style={{ display: "grid", gridTemplateRows: "repeat(1fr)" }}>
              <Button onClick={() => {
                translate.i18n.changeLanguage("en")
                window.localStorage.setItem("language", "en")
              }}>
                <img src={engIcon} style={{ width: "1.5rem" }} alt="English" />
              </Button>
              <Button onClick={() => {
                translate.i18n.changeLanguage("nor")
                window.localStorage.setItem("language", "nor")

              }}>
                <img src={norIcon} style={{ width: "1.5rem" }} alt="Norsk" />
              </Button>
            </div>
            : null}
        </Container>

      </IconContext.Provider>
    </>
  );
};
const Title = styled.h2`
  margin-left: 2vh;
  width: 15rem;
`;
const Container = styled.div`
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

export default NavbarHeader;

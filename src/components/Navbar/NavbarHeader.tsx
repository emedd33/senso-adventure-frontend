import React, { FunctionComponent } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import styled from "styled-components";

import NavbarHeaderBreadCrumbs from "./NavbarHeaderBreadCrumbs"

import { LIGHT_PINK } from "../../assets/constants/Constants";
import NavbarHeaderMenu from "./NavbarHeaderMenu";

type NavbarHeaderProps = { showSidebar: any };
const NavbarHeader: FunctionComponent<NavbarHeaderProps> = ({ showSidebar }) => {

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
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavBarOpenIcon>

                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <span>
                                <Title>Senso Adventure</Title>
                            </span>
                        </Link>
                        <NavbarHeaderBreadCrumbs />
                    </div>
                    <NavbarHeaderMenu />
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

const NavBarItem = styled.ul`
  background-color: ${LIGHT_PINK};
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0;
`;
export default NavbarHeader;

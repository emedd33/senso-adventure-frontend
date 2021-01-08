import React, { FunctionComponent, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import CosCrest from "../../assets/backgroundImage/CosCrest.png"
import HomeCrest from "../../assets/backgroundImage/home_crest.png"
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
type NavbarProps = {}
const Navbar: FunctionComponent<NavbarProps> = () => {
    const [sidebar, setSidebar] = useState(false);
    const [cosHover, setCosHover] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const toggleCosHover = () => setCosHover(!cosHover)
    return (
        <>

            <IconContext.Provider value={{ color: 'black' }}>
                <NavBarHeader>
                    <div style={{ flex: "1", display: "flex", alignItems: "center" }}>

                        <NavBarOpenIcon to='#'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavBarOpenIcon>
                        <Link to="/" onClick={() => setSidebar(false)} style={{ textDecoration: 'none', color: "black" }}>
                            <span>
                                <Title>Senso Adventure</Title>
                            </span>
                        </Link>
                    </div>
                    <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "4rem" }}>
                        <Link to="/login" onClick={() => setSidebar(false)} style={{ textDecoration: 'none', color: "black" }}>
                            <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <BsIcons.BsPersonFill onClick={() => console.log("hei")} />
                                <p style={{ marginBottom: "0" }}>Sign in</p>
                            </span>
                        </Link>
                    </div>



                </NavBarHeader>
                <div className={sidebar ? 'opacity-container active' : "opacity-container"} onClick={() => sidebar ? setSidebar(false) : null}>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul style={{ width: "100%" }} onClick={showSidebar}>

                        <div className={cosHover ? 'cos-navbar-container active' : 'cos-navbar-container'}>
                            <NavBarItem >
                                <Link to="/" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} style={{ textDecoration: 'none', color: "black" }}>
                                    <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <img src={HomeCrest} alt={"Curse of strahd"} style={{ width: "2rem", height: "2rem" }} />
                                        <CosTitle>Home</CosTitle>
                                    </span>
                                </Link>
                            </NavBarItem>
                            <NavBarItem >
                                <Link to="/curseOfStrahd" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} style={{ textDecoration: 'none', color: "black" }}>
                                    <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <img src={CosCrest} alt={"Curse of strahd"} style={{ width: "2rem", height: "2rem" }} />
                                        <CosTitle>Curse of Strahd</CosTitle>
                                    </span>
                                </Link>
                            </NavBarItem>
                        </div>

                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}
const Title = styled.h1`
text-shadow: 0px 1px;
margin-left:2vh
`
const CosTitle = styled.h2`
font-size: 2rem;
margin-bottom: 0;
margin-left:2vh;
:hover {
    color: #ed1212;
    cursor: pointer;
}
`
const NavBarHeader = styled.div`
    background-color: #AB9696;
  width:100%;
  box-shadow;
  height:5rem;
  display: flex;
  position: fixed;
  justify-content: start;
  align-items: center;
box-shadow: 5px 0px 15px 2px #000000;
z-index:450;
`
const NavBarOpenIcon = styled(Link)`
    margin-left: 2rem;
    marin-ritgh: 2rem;
    font-size: 2rem;
    background: none;`


const NavBarItem = styled.ul`
    background-color:#AB9696;
  width: 80%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding:0;

`
export default Navbar;

import React, { FunctionComponent, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
                    <NavBarOpenIcon to='#'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavBarOpenIcon>
                    <Link to="/" onClick={() => setSidebar(false)} style={{ textDecoration: 'none', color: "black" }}>
                        <span>
                            <Title>Senso Adventure</Title>
                        </span>
                    </Link>

                </NavBarHeader>
                <div className={sidebar ? 'opacity-container active' : "opacity-container"} onClick={() => sidebar ? setSidebar(false) : null}>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul style={{ width: "80%", paddingTop: "20vh" }} onClick={showSidebar}>
                        <div className={cosHover ? 'cos-navbar-container active' : 'cos-navbar-container'}>

                            <NavBarItem >
                                <Link to="/curse_of_strahd" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} style={{ textDecoration: 'none', color: "black" }}>
                                    <span><CosTitle>Curse of Strahd</CosTitle></span>
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
margin-left:2vh;
:hover {
    color: #ed1212;
    cursor: pointer;
}
`
const NavBarHeader = styled.div`
    background-color: #AB9696;
  height: 80px;
  width:100%;
  box-shadow
  padding:10rem;
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

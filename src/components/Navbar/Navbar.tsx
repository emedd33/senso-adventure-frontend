import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

function Navbar() {
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
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul style={{ width: "80%" }} onClick={showSidebar}>
                            <NavBarBackIcon to='#'>
                                <AiIcons.AiOutlineClose />
                            </NavBarBackIcon>


                            <div className={cosHover ? 'cos-navbar-container active' : 'cos-navbar-container'}>

                                <NavBarItem >
                                    <Link to="/curse_of_strahd" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} style={{ textDecoration: 'none', color: "black" }}>
                                        <span><h3>Curse of Strahd</h3></span>
                                    </Link>
                                </NavBarItem>
                            </div>

                        </ul>
                    </nav>
                </div>
            </IconContext.Provider>
        </>
    );
}
const Title = styled.h2`
text-shadow: 0px 1px;
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
z-index:250;
`
const NavBarBackIcon = styled(Link)`
    margin-left: 0rem;
    font-size: 2rem;
    background: none;`

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

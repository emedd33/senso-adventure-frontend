import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: 'black' }}>
                <NavBarHeader>
                    <NavBarOpenIcon to='#'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavBarOpenIcon>

                </NavBarHeader>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul style={{ width: "80%" }} onClick={showSidebar}>
                        <NavBarBackIcon to='#'>
                            <AiIcons.AiOutlineClose />
                        </NavBarBackIcon>

                        <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                            <span><h2>Senso Adventure</h2></span>
                        </Link>
                        {SidebarData.map((item, index) => {
                            return (
                                <NavBarItem key={index}>
                                    <Link to={item.path} style={{ textDecoration: 'none', color: "black" }}>
                                        <span>{item.title}</span>
                                    </Link>
                                </NavBarItem>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}
const NavBarHeader = styled.div`
    background-color: #AB9696;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
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

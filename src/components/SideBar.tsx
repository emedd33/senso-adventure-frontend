import styled from "styled-components"
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import React, { useState } from "react";
import './SideBar.css';
import { IconContext } from 'react-icons';
import { Link } from "react-router-dom";
const SideBar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <BsIcons.BsArrowBarLeft />
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to="adventure" style={{ textDecoration: 'none' }}>
                            <SensoAdventureTitle>Senso Adventure</SensoAdventureTitle>
                        </Link>
                    </li>
                    <li className='navbar-toggle'>
                        <Link to="adventure" style={{ textDecoration: 'none' }}>
                            <h2 style={{ paddingLeft: 13, color: "black" }}>Curse of Strahd</h2>
                        </Link>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    )
}

const SensoAdventureTitle = styled.h1`
    paddingLeft: 13;
    color: black;
    font-familty
`
export default SideBar
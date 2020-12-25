import styled from "styled-components"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
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
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                </ul>
            </nav>
        </IconContext.Provider>
    )
}
const NavBar = styled.div`
    
`
export default SideBar
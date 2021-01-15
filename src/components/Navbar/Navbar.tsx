import React, { FunctionComponent, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CosCrest from "../../assets/backgroundImage/CosCrest.png"
import HomeCrest from "../../assets/backgroundImage/home_crest.png"
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
import MenuListComposition from '../MenuList/MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchSetSelectedCampaign } from '../../store/selected/selectedCreators';
import { Backdrop, Breadcrumbs, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

type NavbarProps = {}
const Navbar: FunctionComponent<NavbarProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const campaign = useSelector((state: RootReducerProp) => state.campaigns)
    const [sidebar, setSidebar] = useState(false);
    const [cosHover, setCosHover] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const toggleCosHover = () => setCosHover(!cosHover)
    const toggleSetCampaign = (campaign: ICampaign) => {
        dispatch(dispatchSetSelectedCampaign(campaign.id))
    }
    return (
        <>

            <IconContext.Provider value={{ color: 'black' }}>
                <NavBarHeader>
                    <div style={{ flex: "1", display: "flex", alignItems: "center" }}>

                        <NavBarOpenIcon to='#'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavBarOpenIcon>
                        <Link to="/" onClick={() => setSidebar(false)} style={{ textDecoration: 'none', color: "black" }}>
                            <span >
                                <Title>Senso Adventure</Title>
                            </span>
                        </Link>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Breadcrumbs aria-label="breadcrumb">

                                <Link to="/" style={{ textDecoration: "none" }} >
                                    <h3 style={{ color: "black", fontFamily: "Italliano cursive" }}>Home</h3>
                                </Link>
                                <Typography color="textPrimary">
                                    <h3 style={{ color: "black", fontFamily: "Italliano cursive", opacity: 0.5 }}>Home</h3>
                                </Typography>
                            </Breadcrumbs>
                        </div>
                    </div>
                    <MenuListComposition />




                </NavBarHeader>
                <Backdrop className={classes.backdrop} open={sidebar} onClick={showSidebar}>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                        <ul style={{ width: "100%", paddingLeft: "1rem" }} onClick={showSidebar}>

                            <div className={cosHover ? 'cos-navbar-container active' : 'cos-navbar-container'}>
                                <NavBarItem >
                                    <Link to="/" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} style={{ textDecoration: 'none', color: "black" }}>
                                        <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <img src={HomeCrest} alt={"Curse of strahd"} style={{ width: "2rem", height: "2rem" }} />
                                            <CampaignTitle>Home</CampaignTitle>
                                        </span>
                                    </Link>
                                </NavBarItem>
                                <NavBarItem >
                                    <Link to="/campaign" onMouseEnter={toggleCosHover} onMouseLeave={toggleCosHover} onClick={() => toggleSetCampaign(campaign.curseOfStrahd)} style={{ textDecoration: 'none', color: "black" }}>
                                        <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <img src={CosCrest} alt={"Curse of strahd"} style={{ width: "2rem", height: "2rem" }} />
                                            <CampaignTitle>Curse of Strahd</CampaignTitle>
                                        </span>
                                    </Link>
                                </NavBarItem>
                            </div>

                        </ul>
                    </nav>
                </Backdrop>
            </IconContext.Provider>
        </>
    );
}
const Title = styled.h2`
margin-left:2vh;
width:10rem;
height:
`
const CampaignTitle = styled.h3`
font-size: 100%;
padding;0;
margin:0;
margin-left:2vw;
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
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding:0;

`
export default Navbar;

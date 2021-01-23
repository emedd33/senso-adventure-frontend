import React, { FunctionComponent, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import HomeCrest from "../../assets/backgroundImage/home_crest.png"
import './Navbar.css';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
import MenuListComposition from '../MenuList/MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchSetSelectedCampaign } from '../../store/selected/selectedCreators';
import { Backdrop, Breadcrumbs, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useWindowSize from '../../store/hooks/useWindowSize';
import IsLoading from '../IsLoading/IsLoading';
import { storage } from '../../firebase';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

type CrestObjectType = {
    title: string,
    url: string
}
type NavbarProps = {}
const Navbar: FunctionComponent<NavbarProps> = () => {
    const classes = useStyles();
    const size = useWindowSize()
    const location = useLocation()
    const dispatch = useDispatch()
    const urlPathArray = location.pathname.split("/")
    if (urlPathArray.length === 2 && urlPathArray[0] === urlPathArray[1]) {
        urlPathArray.pop()
    }
    const campaigns = useSelector((state: RootReducerProp) => state.campaigns)
    const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
    const [sidebar, setSidebar] = useState(false);
    const [campaignCrestFiles, setCampainCrestFiles] = useState<CrestObjectType[]>([])
    const showSidebar = () => setSidebar(!sidebar);
    const toggleSetCampaign = (campaignId: string) => {
        dispatch(dispatchSetSelectedCampaign(campaignId))
    }
    useEffect(() => {
        storage.ref("/Images/Crest/").listAll()
            .then(crestFiles => {
                crestFiles.items.map(crestFile => {
                    return crestFile.getDownloadURL().then(url => url).then(url => url).then(async (url) => {
                        await crestFile.getMetadata().then(data => {
                            if (data.customMetadata !== undefined && data.customMetadata.campaignTitle !== undefined) {
                                setCampainCrestFiles([
                                    ...campaignCrestFiles,
                                    { title: data.customMetadata.campaignTitle, url: url }
                                ])
                            }
                            return
                        })
                    })
                })
            })
            .catch(e => console.log(e))
    }, [campaignCrestFiles])
    if (!campaigns) {
        return <IsLoading />
    }
    console.log(campaignCrestFiles)
    return (
        <>

            <IconContext.Provider value={{ color: 'black' }}>
                <NavBarHeader>
                    <div style={{ height: "5rem", flex: "3", display: "flex", alignItems: "center" }}>

                        <NavBarOpenIcon to='#'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavBarOpenIcon>
                        <Link to="/" onClick={() => setSidebar(false)} style={{ textDecoration: 'none', color: "black" }}>
                            <span >
                                <Title>Senso Adventure</Title>
                            </span>
                        </Link>
                        <div style={{ display: "flex", height: "5rem", justifyContent: "flex-start", alignItems: "center", flexWrap: "nowrap" }}>
                            {size.width && size.width! > 769 ?

                                <Breadcrumbs aria-label="breadcrumb" >
                                    {urlPathArray.map((path: string, index: any) => {

                                        let crumb = !path ? "Home" : path.charAt(0).toUpperCase() + path.slice(1)
                                        let linkPath = urlPathArray.slice(0, index + 1).join("/")
                                        linkPath = !linkPath ? "/" : linkPath
                                        if (urlPathArray.length - 1 !== index) {
                                            return (
                                                <Link to={linkPath} style={{ textDecoration: "none", color: "black", fontFamily: "italianno, cursive", fontSize: "1.5rem" }} key={index} >
                                                    {crumb}
                                                </Link>
                                            )
                                        }
                                        else {

                                            return (
                                                <Typography color="textPrimary" style={{ textDecoration: "none", color: "black", fontFamily: "italianno, cursive", fontSize: "1.5rem", opacity: 0.8 }} key={index}>
                                                    {crumb}
                                                </Typography>
                                            )
                                        }
                                    })}

                                </Breadcrumbs>
                                : null}
                        </div>
                    </div>
                    <MenuListComposition />




                </NavBarHeader>
                <Backdrop className={classes.backdrop} open={sidebar} onClick={showSidebar}>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                        <ul style={{ width: "100%", paddingLeft: "1rem" }} onClick={showSidebar}>

                            <div className={'cos-navbar-container'}>
                                <NavBarItem >
                                    <Link to="/" style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                        <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <img src={HomeCrest} alt={"Curse of strahd"} style={{ width: "3rem", height: "3rem" }} />
                                            <CampaignTitle>Home</CampaignTitle>
                                        </span>
                                    </Link>
                                </NavBarItem>{
                                    Object.entries(campaigns).map(([id, campaign]) => {
                                        const crestObject = Object.values(campaignCrestFiles).filter(file => file.title === campaign.title)
                                        const crestObjectUrl = crestObject.length > 0 ? crestObject[0].url : ""
                                        return (
                                            <NavBarItem >
                                                <Link to="/campaign" onClick={() => toggleSetCampaign(id)} style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                                    <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                        <img style={{ width: "3rem", height: "3rem" }} src={crestObjectUrl} alt="Crest symbol" />
                                                        <CampaignTitle>{campaign.title}</CampaignTitle>
                                                    </span>
                                                </Link>
                                            </NavBarItem>

                                        )
                                    })

                                }

                                {authUser ?
                                    <NavBarItem>

                                        <Link to="/editcampaign" style={{ textDecoration: "none" }}>
                                            <span style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", textTransform: "none" }}>
                                                <AddIcon style={{ color: "black" }} />
                                                <CampaignTitle>

                                                    Add new
                                            </CampaignTitle>
                                            </span>
                                        </Link>

                                    </NavBarItem>
                                    : null
                                }

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
font-size: 1.7rem;
`
const CampaignTitle = styled.h1`
padding;0;
margin:0;
width:100%;
font-size: 2rem;
margin-left:2vw;
:hover {
    color: #ed1212;
    cursor: pointer;
}
color:black;
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

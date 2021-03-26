import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import HomeCrest from "../../assets/icons/home_crest.png";
import "./Navbar.css";
import styled from "styled-components";
import CampaignCrest from "../../assets/icons/CampaignCrest.png";
import { useDispatch, useSelector } from "react-redux";
import useOwner from "../../store/hooks/useOwner"
import {
    clearSelectedCampaign,
    setSelectedCampaign,
} from "../../store/selected/selectedCreators";

import AddIcon from "@material-ui/icons/Add";
import IsLoading from "../IsLoading/IsLoading";
import { LIGHT_PINK } from "../../assets/constants/Constants";
import { initialSelectedCampaignState } from "../../store/selected/selectedReducer";
import { getAuthUser, getIsSidebarShown } from "../../store/admin/adminSelectors";
import { useTranslation } from "react-i18next";


type NavbarSidebarProps = {};
const NavbarSidebar: FunctionComponent<NavbarSidebarProps> = () => {
    const translation = useTranslation()
    const dispatch = useDispatch();
    const rootCampaigns = useSelector(
        (state: RootReducerProp) => state.rootCampaigns
    );
    const authUser = useSelector(getAuthUser);
    const owner = useOwner()
    const isSidebarOpen = useSelector(getIsSidebarShown)


    if (!rootCampaigns) {
        return <IsLoading />;
    }
    return (
        <>
            <nav className={isSidebarOpen ? "nav-menu active" : "nav-menu"}>

                <div className={"cos-navbar-container"}>
                    <NavBarItem>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "black",
                                width: "100%",
                            }}
                        >
                            <span
                                style={{
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={HomeCrest}
                                    alt={"Home"}
                                    style={{ width: "3rem", height: "3rem" }}
                                />
                                <CampaignTitle>{translation.t('Home')}</CampaignTitle>
                            </span>
                        </Link>
                    </NavBarItem>
                    {Object.entries(rootCampaigns.campaigns).map(
                        ([id, campaign]) => {
                            return (
                                <NavBarItem
                                    key={id}
                                    onClick={() =>
                                        dispatch(
                                            setSelectedCampaign({
                                                id: "",
                                                campaign: initialSelectedCampaignState,
                                            })
                                        )
                                    }
                                >
                                    <Link
                                        to={`/user/${authUser.displayName}/campaigns/${campaign.slug}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                            width: "100%",
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding: "1rem",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                style={{ width: "3rem", height: "2rem" }}
                                                src={CampaignCrest}
                                                alt="Crest symbol"
                                            />
                                            <CampaignTitle>{campaign.title}</CampaignTitle>
                                        </span>
                                    </Link>
                                </NavBarItem>
                            );
                        }
                    )}

                    {authUser && authUser.displayName === owner ? (
                        <NavBarItem>
                            <Link
                                to={`/user/${authUser.displayName}/newcampaign`}
                                onClick={() => dispatch(clearSelectedCampaign())}
                                style={{ textDecoration: "none" }}
                            >
                                <span
                                    style={{
                                        padding: "1rem",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textTransform: "none",
                                    }}
                                >
                                    <AddIcon style={{ color: "black" }} />
                                    <CampaignTitle>{translation.t('Add new')}</CampaignTitle>
                                </span>
                            </Link>
                        </NavBarItem>
                    ) : null}
                </div>
            </nav>

        </>
    );
};

const CampaignTitle = styled.h1`
padding;0;
margin:0;
width:100%;
margin-left:2vw;
:hover {
    color: #ed1212;
    cursor: pointer;
}
color:black;
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
export default NavbarSidebar;

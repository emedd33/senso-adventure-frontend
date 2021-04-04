import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Scroll from "../../../components/Scroll/Scroll";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
    getSelectedCampaign,
    getSelectedCampaignStoragePath,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";

import {
    OLD_WHITE_TRANSPARENT,
    OLD_WHITE,
    OLD_WHITE_DARK,
} from "../../../assets/constants/Constants";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Button,
    Typography,
    IconButton,
} from "@material-ui/core";
import { filterUnpublished } from "./../../../utils/Database";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ScrollMenu from "react-horizontal-scrolling-menu";
import useOwner from "../../../store/hooks/useOwner";
import { getUrlFromStorage } from "../../../services/Firebase/storage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useWindowSize from "../../../store/hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import SensoDraftJS from "../../../components/SensoDraftJS/SensoDraftJS";
import { SensoMonsterShort, SensoPlayerShort } from "../../../components/SensoContainers";
import renderArrayOfString from "../../../utils/StringProcessing/renderArrayOfString";

const MenuItem: React.FC<{ text: any; selected: any; key: number }> = ({
    text,
    selected,
    key,
}) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`} key={key}>
            {text}
        </div>
    );
};

export const Menu = (list: any[], selected: any) =>
    list.map((el, index) => {
        const { name } = el;

        return <MenuItem text={name} key={index} selected={selected} />;
    });

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
    const owner = useOwner();
    const translate = useTranslation();
    const location = useLocation()
    const selectedCampaignStoragePath = useSelector(
        getSelectedCampaignStoragePath
    );
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const selectedCampaign = useSelector(getSelectedCampaign);
    useMemo(() => {
        getUrlFromStorage(selectedCampaignStoragePath + "/TitleImage").then((url) =>
            setCampaignTitleImage(url)
        ).catch(() => null);
    }, [selectedCampaignStoragePath]);


    return (
        <Container>
            {campaignTitleImage ? (
                <img
                    src={campaignTitleImage}
                    alt="Campaign title"
                    style={{
                        maxHeight: "20rem",
                        width: "70%",
                        marginBottom: "1rem",
                    }}
                />
            ) : null}
            {isDungeonMaster ? (
                <div onDoubleClick={() => {
                    if (isDungeonMaster) {
                        history.push(`${location.pathname}/edit`)
                    }
                }}
                >
                    <SensoDraftJS
                        storagePath={`${selectedCampaignStoragePath}`}
                        readOnly={true}
                        isDungeonMaster={isDungeonMaster}
                    />
                </div>
            ) : null}


        </Container>
    );
};

const Container = styled.div`
  margin-bottom: 10rem;
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem;
`;
const Overview = styled.div`
  background: ${OLD_WHITE_TRANSPARENT};
  padding: 1rem;
  margin-top: 5rem;
`;
export default Campaign;

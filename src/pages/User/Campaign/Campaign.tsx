import React, { FunctionComponent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
    getSelectedCampaignStoragePath,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";

import { getUrlFromStorage } from "../../../services/Firebase/storage";
import SensoDraftJS from "../../../components/SensoDraftJS/SensoDraftJS";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
    const translate = useTranslation()
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
    const location = useLocation()
    const selectedCampaignStoragePath = useSelector(
        getSelectedCampaignStoragePath
    );
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
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
                <div style={{width:"100%"}} onDoubleClick={() => {
                    if (isDungeonMaster) {
                        history.push(`${location.pathname}/edit`)
                    }
                }}
                >
                     <div>
            <Link to={`${location.pathname}/edit`} style={{textDecoration:"none", display:"flex", justifyContent:"center", marginBottom:"1rem"}}>
                <Button color="primary" variant="contained" >{translate.t('Edit')}</Button>
            </Link>
            </div>
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
  padding: 1rem;
`;
export default Campaign;

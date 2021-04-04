import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { OLD_WHITE } from '../../../assets/constants/Constants';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSelectedCampaign } from '../../../store/selected/selectedSelectors';
import useOwner from '../../../store/hooks/useOwner';

const useStyles = makeStyles({
    root: {
        width: "90%",
        backgroundColor: OLD_WHITE,
        zIndex: 200,
        marginTop: "10rem",
    },
});

export default function CampaignIndexTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const location = useLocation()
    const selectedCampaign = useSelector(getSelectedCampaign)
    const owner = useOwner()
    const [currentLocationTab, setCurrentLocationTab] = useState(0)
    useEffect(() => {
        let locationArray = location.pathname.split("/")
        if (locationArray[5] === "sessions") {
            setValue(1)
        }
        else if (locationArray[5] === "players") {
            setValue(2)
        }
        else if (locationArray[5] === "locations") {
            setValue(3)
        }
        else if (locationArray[5] === "monsters") {
            setValue(4)
        }
        else if (locationArray[3] === "campaigns" && locationArray.length > 3) {
            setValue(0)
        }

    }, [location])
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}`} style={{ textDecoration: "none", color: "black" }}>
                    <Tab label="Campaign" />
                </Link>
                <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/sessions`} style={{ textDecoration: "none", color: "black" }}>
                    <Tab label="Sessions" />
                </Link>
                <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/players`} style={{ textDecoration: "none", color: "black" }}>
                    <Tab label="Players" />
                </Link>
                <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/locations`} style={{ textDecoration: "none", color: "black" }}>
                    <Tab label="Locations" />
                </Link>
                <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/monsters`} style={{ textDecoration: "none", color: "black" }}>
                    <Tab label="Monsters" />
                </Link>
            </Tabs>
        </Paper>
    );
}



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
} from "react-router-dom";
import { OLD_WHITE_TRANSPARENT } from "../../assets/constants/Constants"
import AddIcon from "@material-ui/icons/Add";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { initialSelectedSessionState } from "../../store/selected/selectedReducer";
import { getSelectedCampaign } from "../../store/selected/selectedSelectors";
import { setSelectedMonster, setSelectedPlayer, setSelectedSession } from "../../store/selected/selectedCreators";
import sessionIcon from "../../assets/icons/session_icon.png"
import characterIcon from "../../assets/icons/character_icon.png"
import monsterIcon from "../../assets/icons/monster_icon.png"
import locationIcon from "../../assets/icons/location_icon.png"
import useOwner from "../../store/hooks/useOwner";
type SensoFabProps = {

}
const SensoFab: React.FC<SensoFabProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const owner = useOwner()
    const selectedCampaign = useSelector(getSelectedCampaign);

    return (
        <Fab
            mainButtonStyles={{ backgroundColor: OLD_WHITE_TRANSPARENT }}
            icon={<AddIcon />}
            alwaysShowTitle={true}
        >
            <Action
                style={{ backgroundColor: "transparent" }}
                text="New session"
                onClick={() => {
                    dispatch(
                        setSelectedSession({
                            id: "",
                            session: initialSelectedSessionState,
                        })
                    );
                    if (selectedCampaign) {
                        history.push(`/user/${owner}/${selectedCampaign.campaign.slug}/sessions/new`);
                    }
                }}
            >
                <img src={sessionIcon} style={{ width: "inherit" }} alt="New Session" />
            </Action>
            <Action
                text="New NPC/Monster"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        dispatch(
                            setSelectedMonster()
                        );
                        history.push(
                            `/user/${owner}/${selectedCampaign.campaign.slug}/monsters/new`
                        );
                    }
                }}
            >
                <img src={monsterIcon} style={{ width: "inherit" }} alt="New Monster" />

            </Action>
            <Action
                text="New Player"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        dispatch(
                            setSelectedPlayer()
                        );
                        history.push(
                            `/user/${owner}/${selectedCampaign.campaign.slug}/players/new`
                        );
                    }
                }}
            >
                <img src={characterIcon} style={{ width: "inherit" }} alt="New Character" />

            </Action>
            <Action
                text="New Location"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        history.push(
                            `/user/${owner}/${selectedCampaign.campaign.slug}/locations/new`
                        );
                    }
                }}
            >
                <img src={locationIcon} style={{ width: "inherit" }} alt="New Location" />

            </Action>

        </Fab>
    )
}

export default SensoFab
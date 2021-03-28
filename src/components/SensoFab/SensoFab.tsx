

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
} from "react-router-dom";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
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
import { useTranslation } from "react-i18next";
type SensoFabProps = {

}
const SensoFab: React.FC<SensoFabProps> = () => {
    const history = useHistory();
    const translate = useTranslation()
    const dispatch = useDispatch()
    const owner = useOwner()
    const selectedCampaign = useSelector(getSelectedCampaign);

    return (
        <Fab
            mainButtonStyles={{ backgroundColor: OLD_WHITE_DARK }}
            icon={<AddIcon />}
            alwaysShowTitle={true}
        >
            <Action
                style={{ backgroundColor: "transparent" }}
                text={translate.t('New session')}
                onClick={() => {
                    dispatch(
                        setSelectedSession({
                            id: "",
                            session: initialSelectedSessionState,
                        })
                    );
                    if (selectedCampaign) {
                        history.push(`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-session`);
                    }
                }}
            >
                <img src={sessionIcon} style={{ width: "inherit" }} alt={translate.t('New session')} />
            </Action>
            <Action
                text={translate.t('New monster/NPC')}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        dispatch(
                            setSelectedMonster()
                        );
                        history.push(
                            `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-monster`
                        );
                    }
                }}
            >
                <img src={monsterIcon} style={{ width: "inherit" }} alt={translate.t('New monster/NPC')} />

            </Action>
            <Action
                text={translate.t('New player')}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        dispatch(
                            setSelectedPlayer()
                        );
                        history.push(
                            `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-player`
                        );
                    }
                }}
            >
                <img src={characterIcon} style={{ width: "inherit" }} alt={translate.t('New player')} />

            </Action>
            <Action
                text={translate.t('New location')}
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                    if (selectedCampaign) {
                        history.push(
                            `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-location`
                        );
                    }
                }}
            >
                <img src={locationIcon} style={{ width: "inherit" }} alt={translate.t('New location')} />

            </Action>

        </Fab>
    )
}

export default SensoFab
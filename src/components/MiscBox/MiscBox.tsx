import { Button, IconButton } from '@material-ui/core';
import React, { useState } from "react";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LevelUp from "../../assets/icons/level_up.png"
import Victory from "../../assets/icons/victory.png"
import "./MiscBox.scss"
import { OLD_WHITE } from '../../assets/constants/Constants';
import styled from 'styled-components';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import levelUpSound from '../../assets/audio/ding.mp3';
import victorySound from '../../assets/audio/victory_short.mp3';

export interface MiscBoxProps {

}

const MiscBox: React.FC<MiscBoxProps> = () => {
    const [clicked, setClicked] = useState(false)
    const [isLevelUpDialogOpen, setIsLevelUpDialogOpen] = useState(false)
    const [isCongratulationOpen, setIsCongratulationOpen] = useState(false)

    const [levelUpAudio] = useState(new Audio(levelUpSound));
    const [victoryAudio] = useState(new Audio(victorySound));

    const levelUpCharacters = () => {

        setIsLevelUpDialogOpen(false)
        levelUpAudio.play()
        setIsCongratulationOpen(true)
        setClicked(false)
    }
    return (
        <Container className={clicked ? "misc-container active" : "misc-container"}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Button style={{ width: "100%", display: "flex", justifyContent: "center" }} onClick={() => setClicked(!clicked)}>

                    <p style={{ fontFamily: "italianno", fontSize: "1.5rem", margin: 0 }}>
                        {clicked ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}

                    </p>
                </Button>
            </div>
            {clicked ?
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <IconButton onClick={() => setIsLevelUpDialogOpen(true)}>
                        <img src={LevelUp} alt={"Level up"} style={{ width: "3rem", height: "3rem" }} />
                    </IconButton>
                    <ConfirmDialog title={"Level up the characters?"} content={"Confirm to level up all your characters"} handleConfirm={levelUpCharacters} open={isLevelUpDialogOpen} handleClose={() => setIsLevelUpDialogOpen(false)} isActionsAvailable={true} confetti={false} />
                    <IconButton onClick={() => victoryAudio.play()}>
                        <img src={Victory} alt={"Level up"} style={{ width: "4rem", height: "3rem" }} />
                    </IconButton>

                </div>
                : null}
            <ConfirmDialog title={"Congratulation your characters have leveled up!"} content={"Characters level"} handleConfirm={() => setIsCongratulationOpen(false)} open={isCongratulationOpen} handleClose={() => setIsCongratulationOpen(false)} isActionsAvailable={false} confetti={true} />
        </Container>)
}



const Container = styled.div`
    background-color:${OLD_WHITE}
`
export default MiscBox;
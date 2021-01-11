import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { campaignsRef } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { kill } from 'process';
import { useSelector } from 'react-redux';


interface SelectedPlayerProps {
  selectedPlayer: {
    player: string,
    characterName: string,
    race: string,
    class: string,
    level: number,
    isDead: string
  }
  onClose: any,
  isNewPlayer: boolean,
  campaign: string
}
const PlayerModal: React.FC<SelectedPlayerProps> = ({ selectedPlayer, onClose, isNewPlayer, campaign }) => {
  const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
  const [playerName, setPlayerName] = useState(selectedPlayer.player)
  const [playerNameHelperText, setPlayerNameHelperText] = useState("")
  const [playerNameError, setPlayerNameError] = useState(false)

  const [characterName, setCharacterName] = useState(selectedPlayer.characterName)
  const [race, setRace] = useState(selectedPlayer.race)
  const [level, setLevel] = useState(selectedPlayer.level)
  const [playerClass, setPlayerClass] = useState(selectedPlayer.class)
  const [isDead, setIsDead] = useState(selectedPlayer.isDead)
  const handleSubmit = () => {
    if (!playerName) {
      setPlayerNameHelperText("Please write in the player name")
      setPlayerNameError(true)
      return
    }
    else {
      setPlayerNameError(false)
      setPlayerNameHelperText("")
      campaignsRef.child(campaign).child("players").child(playerName).set({
        playerName: playerName,
        race: race,
        class: playerClass,
        level: level,
        characterName: characterName,
        isDead: isDead
      })
    }
    handleClose()
    window.location.reload()

  }
  const handleDelete = () => {
    campaignsRef.child(campaign).child("players").child(playerName).set(null)
    handleClose()
    window.location.reload()

  }
  const handleKillOrRevive = () => {
    let isDeadVariable = isDead === "TRUE" ? "FALSE" : "TRUE"
    setPlayerNameError(false)
    setPlayerNameHelperText("")
    campaignsRef.child(campaign).child("players").child(playerName).set({
      playerName: playerName,
      race: race,
      class: playerClass,
      level: level,
      characterName: characterName,
      isDead: isDeadVariable
    })
    handleClose()
    window.location.reload()

  }
  const handleClose = () => {
    onClose(false)
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalContainer>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button color="secondary" onClick={() => {
            handleDelete()
          }} type="submit" disabled={isNewPlayer}>
            <Alert severity={isNewPlayer ? "info" : "error"}>
              <AlertTitle>Delete</AlertTitle>
            </Alert>

          </Button>
        </div>
        <TextField
          fullWidth
          id="playerName"
          type="playerName"
          color="primary"
          label="Player"
          placeholder="Player"
          value={playerName}
          margin="normal"
          error={playerNameError}
          helperText={playerNameHelperText}
          onChange={(event) => setPlayerName(event.target.value)}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}

        />
        <TextField
          fullWidth
          id="characterName"
          type="characterName"
          color="primary"
          label="Character name"
          placeholder="Character name"
          value={characterName}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
          margin="normal"
          onChange={(event) => setCharacterName(event.target.value)}
        />
        <TextField
          fullWidth
          id="race"
          type="race"
          color="primary"
          label="Race"
          placeholder="Race"
          value={race}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
          margin="normal"
          onChange={(event) => setRace(event.target.value)}
        />
        <TextField
          fullWidth
          id="class"
          type="class"
          color="primary"
          label="Class"
          placeholder="Class"
          value={playerClass}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
          margin="normal"
          onChange={(event) => setPlayerClass(event.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <TextField
            id="outlined-number"
            label="Level"
            onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={level}
            onChange={(event) => {
              let level = parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value)
              return setLevel(level)
            }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>
          <Button color="secondary" onClick={handleKillOrRevive} disabled={isNewPlayer} >
            <Alert icon={selectedPlayer.isDead === "TRUE" ? <GiIcons.GiHealthPotion /> : <FaIcons.FaSkullCrossbones />} severity={isNewPlayer ? "info" : "warning"}>
              {selectedPlayer.isDead === "TRUE" ? "Revive character" : "Kill character"}
            </Alert>
          </Button>

        </div>
      </ModalContainer>
    </Modal>
  );
}
const ModalContainer = styled.div`

min-width:20rem;
min-height:20rem;
background-color:white;
margin:2rem;
padding:2rem;
position: 'fixed',
border: 2px solid #000,
`
export default PlayerModal 
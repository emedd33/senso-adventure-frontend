import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { campaignsRef } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import IsLoading from '../IsLoading/IsLoading';
import { dispatchSetSelectedCampaign, updateSelectedPlayer } from '../../store/selected/selectedCreators';


interface SelectedPlayerProps {
  onClose: any,

}
const PlayerModal: React.FC<SelectedPlayerProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const [playerName, setPlayerName] = useState("")
  const [characterName, setCharacterName] = useState("")
  const [playerRace, setPlayerRace] = useState("")
  const [playerClass, setPlayerClass] = useState("")
  const [playerLevel, setPlayerLevel] = useState(1)
  const [playerNameError, setPlayerNameError] = useState(false)
  const [playerNameHelperText, setPlayerNameHelperText] = useState("")
  const selectedPlayer = useSelector((state: RootReducerProp) => state.selected.selectedPlayer)
  const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
  useEffect(() => {
    if (selectedPlayer) {
      setPlayerName(selectedPlayer.player.playerName)
      setCharacterName(selectedPlayer.player.characterName);
      setPlayerRace(selectedPlayer.player.race);
      setPlayerClass(selectedPlayer.player.class);
      setPlayerLevel(selectedPlayer.player.level);
    }
  }, [selectedPlayer])

  if (!selectedPlayer) {
    return (
      <IsLoading />
    )
  }
  if (!selectedCampaign) {
    return (
      <IsLoading />
    )
  }
  const addNewPlayerToFirebase = async () => {
    campaignsRef.child(selectedCampaign?.id).child("players").push({
      playerName: playerName,
      race: playerRace,
      class: playerClass,
      level: playerLevel,
      characterName: characterName,
      isDead: selectedPlayer.player.isDead
    }).then((e) => {
      dispatch(dispatchSetSelectedCampaign(selectedCampaign.id))
    }
    )
  }
  const updatePlayerInFirebase = async () => {
    if (selectedPlayer && selectedPlayer.id) {
      campaignsRef.child(selectedCampaign?.id).child("players").child(selectedPlayer.id).set({
        playerName: playerName,
        race: playerRace,
        class: playerClass,
        level: playerLevel,
        characterName: characterName,
        isDead: selectedPlayer.player.isDead
      }).then((e) => {
        dispatch(dispatchSetSelectedCampaign(selectedCampaign.id))
      })
    }
  }
  const handleSubmit = () => {
    if (!playerName) {
      setPlayerNameHelperText("Please write in the player name")
      setPlayerNameError(true)
      return
    }
    setPlayerNameError(false)
    setPlayerNameHelperText("")
    if (selectedPlayer.isNew) {
      addNewPlayerToFirebase()
    } else {
      updatePlayerInFirebase()
    }
    handleClose()

  }
  const handleDelete = () => {
    if (selectedPlayer && selectedPlayer.id) {
      campaignsRef.child(selectedCampaign?.id).child("players").child(selectedPlayer.id).set(null)
        .then((e) => {
          dispatch(dispatchSetSelectedCampaign(selectedCampaign.id))
        })
    }
    handleClose()


  }
  const handleKillOrRevive = () => {
    let isDeadVariable = selectedPlayer.player.isDead === "TRUE" ? "FALSE" : "TRUE"
    setPlayerNameError(false)
    setPlayerNameHelperText("")
    if (selectedPlayer && selectedPlayer.id) {
      campaignsRef.child(selectedCampaign.id).child("players").child(selectedPlayer.id).set({
        playerName: playerName,
        race: playerRace,
        class: playerClass,
        level: playerLevel,
        characterName: characterName,
        isDead: isDeadVariable
      }).then((e) => {
        dispatch(dispatchSetSelectedCampaign(selectedCampaign.id))
      })
    }
    handleClose()

  }
  const toggleInputChange = (update: any) => {
    dispatch(updateSelectedPlayer(update))
    switch (update.type) {
      case "playerName":
        setPlayerName(update.payload); break
      case "characterName":
        setCharacterName(update.payload); break
      case "playerRace":
        setPlayerRace(update.payload); break
      case "playerClass":
        setPlayerClass(update.payload); break
      case "playerLevel":
        setPlayerLevel(update.payload); break
    }
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
          }} type="submit" disabled={selectedPlayer.isNew}>
            <Alert severity={selectedPlayer.isNew ? "info" : "error"}>
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
          disabled={!selectedPlayer.isNew}
          onChange={(event) => toggleInputChange({ type: "playerName", payload: event.target.value })}


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
          onChange={(event) => toggleInputChange({ type: "characterName", payload: event.target.value })}

        />
        <TextField
          fullWidth
          id="race"
          type="race"
          color="primary"
          label="Race"
          placeholder="Race"
          value={playerRace}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit() : null}
          margin="normal"
          onChange={(event) => toggleInputChange({ type: "playerRace", payload: event.target.value })}

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
          onChange={(event) => toggleInputChange({ type: "playerClass", payload: event.target.value })}

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
            value={playerLevel}
            onChange={(event) => {
              let level = parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value)
              return toggleInputChange({ type: "playerLevel", payload: level })
            }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>
          <Button color="secondary" onClick={handleKillOrRevive} disabled={selectedPlayer.isNew} >
            <Alert icon={selectedPlayer.player.isDead === "TRUE" ? <GiIcons.GiHealthPotion /> : <FaIcons.FaSkullCrossbones />} severity={selectedPlayer.isNew ? "info" : "warning"}>
              {selectedPlayer.player.isDead === "TRUE" ? "Revive character" : "Kill character"}
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
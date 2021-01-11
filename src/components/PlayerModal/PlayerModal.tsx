import React from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

interface SelectedPlayerProps {
  selectedPlayer: {
    player: string,
    characterName: string,
    race: string,
    class: string,
    level: number
  }
  onClose: any
}
const PlayerModal: React.FC<SelectedPlayerProps> = ({ selectedPlayer, onClose }) => {
  console.log(selectedPlayer)
  // getModalStyle is not a pure function, we roll the style only on the first render


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

      </ModalContainer>
    </Modal>
  );
}
const ModalContainer = styled.div`

min-width:20rem;
min-height:20rem;
background-color:white;
margin:2rem;
position: 'fixed',
border: 2px solid #000,
`
export default PlayerModal 
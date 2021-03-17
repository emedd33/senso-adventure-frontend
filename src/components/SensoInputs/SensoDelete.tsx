import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components"
import { database, storage } from '../../firebase';
import { useHistory } from 'react-router-dom';
type SensoDeletePropbs = {
    storagePath: string,
    databasePath: string,
    instanceType: string,
    linkPath: string,
}
const SensoDelete: React.FC<SensoDeletePropbs> = ({ storagePath, databasePath, instanceType, linkPath }) => {
    const history = useHistory()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submitDelete = () => {
        deleteFolderContents(storagePath)
        database.ref(databasePath).remove()
        setOpen(false)
        history.push(linkPath)
    }
    const deleteFolderContents = (path: string) => {
        const ref = storage.ref(path);
        ref.listAll()
            .then(dir => {
                dir.items.forEach(fileRef => {
                    deleteFile(ref.fullPath, fileRef.name);
                });
                dir.prefixes.forEach(folderRef => {
                    deleteFolderContents(folderRef.fullPath);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteFile = (pathToFile: string, fileName: string) => {
        const ref = storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete()
    }

    return (
        <Container>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                {`Delete ${instanceType}`}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Sure you want to delete this ${instanceType}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Deleting this ${instanceType} includes deletion of images and stored data.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={submitDelete} color="primary" autoFocus>
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const Container = styled.div`
`
export default SensoDelete
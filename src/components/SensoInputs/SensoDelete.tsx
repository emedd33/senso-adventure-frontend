import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components"
import { database, storage } from '../../services/Firebase/firebase';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
type SensoDeletePropbs = {
    storagePath: string,
    databasePath: string,
    instanceType: string,
    linkPath: string,
}
const SensoDelete: React.FC<SensoDeletePropbs> = ({ storagePath, databasePath, instanceType, linkPath }) => {
    const history = useHistory()
    const translate = useTranslation()

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
            <Button variant="contained" color="secondary" onClick={handleClickOpen} style={{textTransform:"none"}}>
                {translate.t('Delete')}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{translate.t(`Sure you want to delete?`)}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {translate.t(`Deletion includes deletion of images and stored data`)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"style={{textTransform:"none"}}>
                        {translate.t('Cancel')}
          </Button>
                    <Button onClick={submitDelete} color="primary" autoFocus style={{textTransform:"none"}}>
                        {translate.t('Delete')}
          </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const Container = styled.div`
`
export default SensoDelete
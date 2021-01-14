import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import styled from "styled-components"
import { OLD_WHITE } from "../assets/styles/colors"
import IsLoading from "../components/IsLoading/IsLoading"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import { campaignsRef, storage } from "../firebase"
import { dispatchSetSelectedCampaign } from "../store/selected/selectedCreators"
import parseStringToDate from "../utils/parseStringToDate"
export interface CampaignEditProps {

}


const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const sessionsId = selectedSession ? selectedSession.id : null
    const [imageUrl, setImageUrl] = useState("")
    const [sessionTitle, setSessionTitle] = useState<string | null>(selectedSession?.session.title)
    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false)
    const [sessionStory, setSessionStory] = useState<string | null>(selectedSession?.session.story)
    const [sessionDate, setSessionDate] = useState<Date | any>(
        selectedSession?.session.date ? parseStringToDate(selectedSession.session.date) : Date()
    )
    useEffect(() => {
        if (selectedCampaign) {
            storage.ref('Images/Background/' + selectedCampaign.backgroundImage).getDownloadURL().then((url: string) => {
                setImageUrl(url)
            }).catch(e => console.log(e))
        }
    }, [selectedCampaign])
    const submitSession = () => {
        if (!sessionTitle) {
            setSessionTitleError(true);
            return;
        }
        if (!sessionsId) {
            campaignsRef.child(selectedCampaign!.id).child("sessions").push({
                campaign: selectedCampaign,
                date: sessionDate?.toLocaleDateString(),
                story: sessionStory,
                title: sessionTitle,
            }).then((e) => {
                dispatch(dispatchSetSelectedCampaign(selectedCampaign!.id))
            })
        } else {
            campaignsRef.child(selectedCampaign!.id).child("sessions").child(sessionsId).set({
                campaign: selectedCampaign,
                date: sessionDate?.toLocaleDateString(),
                story: sessionStory,
                title: sessionTitle,
            }).then((e) => {
                dispatch(dispatchSetSelectedCampaign(selectedCampaign!.id))
            })
        }
        history.push("/campaign")
    }
    if (isLoading || !selectedCampaign) {
        return (
            <Container >
                <IsLoading />
            </Container>
        )
    }
    if (!selectedSession) {
        return (<Redirect to="/" />)
    }
    console.log(imageUrl)
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }} >
            <div style={{ marginTop: "10rem", marginBottom: "10rem", width: "50%", backgroundColor: OLD_WHITE, height: "50rem", justifyContent: "center", display: "flex", padding: "1rem", flexDirection: "column", }}>
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <h2>Session title</h2>

                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Write a fitting title"
                        style={{ height: "100%", width: "100%" }}
                        variant="filled"
                        error={sessionTitleError}
                        value={sessionTitle}
                        onChange={(event) => setSessionTitle(event.target.value)}
                    />
                    <h2>Session date</h2>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            autoOk
                            style={{ maxWidth: "20rem" }}
                            clearable
                            disableFuture
                            value={sessionDate}
                            onChange={(date) => {
                                setSessionDate(date)
                            }}
                        />

                    </MuiPickersUtilsProvider>
                </div>
                <h3>The Story</h3>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    placeholder="Write down your adventure for this session"
                    rows={20}
                    style={{ height: "100%", width: "100%" }}
                    variant="filled"
                    value={sessionStory}
                    onChange={((event) => setSessionStory(event.target.value))}
                />
                <Button variant="contained" color="primary" onClick={submitSession}>
                    Submit
                </Button>
            </div>
        </Container>);
}
const Container = styled.div`
z-index:300;
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
height:100%;
min-height:100vh;
`
export default CampaignEdit;
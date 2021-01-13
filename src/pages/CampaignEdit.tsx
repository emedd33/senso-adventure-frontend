import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import styled from "styled-components"
import Background from "../assets/backgroundImage/cos_background.jpg"
import { OLD_WHITE } from "../assets/styles/colors"
import IsLoading from "../components/IsLoading/IsLoading"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import { campaignsRef } from "../firebase"
import { dispatchSetSelectedCampaign } from "../store/selected/selectedCreators"
export interface CampaignEditProps {

}


const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const selectedCampaign = selectedSession ? selectedSession.session.campaign : null
    const sessionsId = selectedSession ? selectedSession.id : null
    const [sessionTitle, setSessionTitle] = useState<string | null>(selectedSession?.session.title)
    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false)
    const [sessionStory, setSessionStory] = useState<string | null>(selectedSession?.session.story)
    const [sessionDate, setSessionDate] = useState<Date | null>(
        new Date(selectedSession?.session.date)
    );
    const submitSession = () => {
        if (!sessionTitle) {
            setSessionTitleError(true);
            return;
        }
        if (!sessionsId) {
            campaignsRef.child(selectedCampaign).child("sessions").push({
                campaign: selectedCampaign,
                date: sessionDate?.toLocaleDateString(),
                story: sessionStory,
                title: sessionTitle,
            }).then((e) => {
                dispatch(dispatchSetSelectedCampaign(selectedCampaign))
            })
        } else {
            campaignsRef.child(selectedCampaign).child("sessions").child(sessionsId).set({
                campaign: selectedCampaign,
                date: sessionDate?.toLocaleDateString(),
                story: sessionStory,
                title: sessionTitle,
            }).then((e) => {
                dispatch(dispatchSetSelectedCampaign(selectedCampaign))
            })
        }
        history.push("/campaign")
    }
    if (isLoading) {
        return (
            <Container >
                <IsLoading />
            </Container>
        )
    }
    if (!selectedSession) {
        return (<Redirect to="/" />)
    }
    return (
        <Container >
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
background-image: url(${Background});
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
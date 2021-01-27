import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { OLD_WHITE } from "../../assets/styles/colors"
import IsLoading from "../../components/IsLoading/IsLoading"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import { campaignsRef, firebaseStorageRef, storage } from "../../firebase"
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators"
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { setError, setIsLoading } from "../../store/admin/adminCreator"
import styled from "styled-components"
export interface CampaignSessionEditProps {

}

const mdParser = new MarkdownIt(/* Markdown-it options */);
const CampaignSessionEdit: React.FC<CampaignSessionEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const sessionFile = useSelector((state: RootReducerProp) => state.selected.selectedSession?.session.story)
    const sessionsId = selectedSession ? selectedSession.id : null
    const [sessionDay, setSessionDay] = useState<number>(selectedSession?.session.sessionDay)
    const [sessionSubTitle, setSessionSubTitle] = useState<string>(selectedSession?.session.subTitle)
    const [sessionTitle, setSessionTitle] = useState<string>(selectedSession?.session.title)
    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false)
    const [sessionStory, setSessionStory] = useState<string>("")
    const [sessionDate, setSessionDate] = useState<string>(
        selectedSession?.session.date ? new Date(selectedSession.session.date).toDateString() : new Date().toDateString()
    )
    useEffect(() => {
        dispatch(setIsLoading(true))
        if (selectedSession && selectedSession?.session.story) {
            storage.ref().child("SessionStories").child(selectedSession.session.story).getDownloadURL()
                .then(url => fetch(url)
                    .then(res => res.text())
                    .then(res => setSessionStory(res))
                )
                .catch(e => console.log("error", e))
        }
        dispatch(setIsLoading(false))
    }, [dispatch, selectedSession])
    const submitSession = () => {
        if (!sessionTitle) {
            setSessionTitleError(true);
            dispatch(setError("Please fille out the Session Title"))
            return;
        }
        if (selectedCampaign?.id) {
            try {
                let sessionMDFile = sessionFile ? sessionFile : sessionTitle + "_" + selectedCampaign.id + "_" + sessionDate + ".md"
                const toUpload = {
                    campaign: selectedCampaign.id,
                    date: sessionDate ? sessionDate : new Date().toDateString(),
                    story: sessionMDFile,
                    title: sessionTitle,
                    subTitle: sessionSubTitle ? sessionSubTitle : "",
                    campaignTitle: selectedCampaign.campaign.title,
                    sessionDay: sessionDay ? sessionDay : 1
                }

                if (sessionsId) {
                    campaignsRef.child(selectedCampaign.id).child("sessions/" + sessionsId).set(toUpload).then((e) => {
                        dispatch(dispatchSetSelectedCampaign(selectedCampaign!.id))
                    })
                } else {
                    campaignsRef.child(selectedCampaign.id).child("sessions").push(toUpload).then((e) => {
                        dispatch(dispatchSetSelectedCampaign(selectedCampaign!.id))
                    })
                }
                var file = new File([sessionStory], sessionMDFile, { type: "text/plain;charset=utf-8" });
                var metadata = {
                    contentType: 'markdown',
                    session: sessionsId,
                    campaign: selectedCampaign.id,
                    date: sessionDate,
                    day: sessionDay
                };
                firebaseStorageRef.child("SessionStories").child(sessionMDFile).put(file, metadata)
                history.push("/campaign/session")
            } catch (error) {
                throw error
            }
        }
    }
    function handleEditorChange(html: any) {
        setSessionStory(html.text)
    }
    if (!selectedSession) {
        return (
            <IsLoading />
        )
    }
    return (
        <div style={{ marginBottom: "10rem", width: "70%", backgroundColor: OLD_WHITE, alignItems: "center", justifyContent: "center", display: "flex", padding: "1rem", flexDirection: "column", }}>
            <TitleContainer>

                <TextField
                    id="outlined-multiline-static"
                    placeholder="Write a fitting title"
                    variant="filled"
                    style={{ width: "90%", margin: "1rem" }}
                    label="Session title"
                    error={sessionTitleError}
                    value={sessionTitle}
                    onChange={(event) => setSessionTitle(event.target.value)}
                />


                <TextField
                    id="outlined-multiline-static"
                    placeholder="Write a fitting subtitle"
                    style={{ width: "90%", margin: "1rem" }}
                    variant="filled"
                    label="Subtitle"
                    value={sessionSubTitle}
                    onChange={(event) => setSessionSubTitle(event.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Session number"
                    placeholder="Which session is this?"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: "90%", margin: "1rem" }}
                    value={sessionDay}
                    onChange={(event) => {
                        let day = parseInt(event.target.value) < 0 ? 0 : parseInt(event.target.value)
                        if (day) {
                            setSessionDay(day)
                        }
                    }}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        autoOk
                        style={{ margin: "1rem" }}
                        clearable
                        disableFuture
                        value={sessionDate}
                        onChange={(date) => setSessionDate(date ? date.toDateString() : new Date().toDateString())}
                    />

                </MuiPickersUtilsProvider>


            </TitleContainer>
            <br />
            <h3>The Story</h3>
            <MdEditor
                style={{
                    height: "500px", width: "100%", margin: "1rem", marginTop: "0", fontFamily: "sans-serif"
                }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                value={sessionStory ? sessionStory : ""}
            />
            <Button variant="contained" color="primary" onClick={submitSession}>
                Submit
                </Button>
        </div>
    )
}

const TitleContainer = styled.div`
background-color: white; 
width: 20rem; 
justify-content: center;
align-items: center; 
display: flex;
flex-direction: column; 
margin-bottom:2rem;
webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);

`
export default CampaignSessionEdit;
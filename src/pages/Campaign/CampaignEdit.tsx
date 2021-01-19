import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { OLD_WHITE } from "../../assets/styles/colors"
import IsLoading from "../../components/IsLoading/IsLoading"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import { campaignsRef, firebaseStorageRef, storage } from "../../firebase"
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators"
import parseStringToDate from "../../utils/parseStringToDate"
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { setIsLoading } from "../../store/admin/adminCreator"
export interface CampaignEditProps {

}

const mdParser = new MarkdownIt(/* Markdown-it options */);
const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const sessionFile = useSelector((state: RootReducerProp) => state.selected.selectedSession?.session.story)
    const sessionsId = selectedSession ? selectedSession.id : null
    const [sessionTitle, setSessionTitle] = useState<string | null>(selectedSession?.session.title)
    const [sessionTitleError, setSessionTitleError] = useState<boolean>(false)
    const [sessionStory, setSessionStory] = useState<string | null>("")
    const [sessionDate, setSessionDate] = useState<Date | any>(
        selectedSession?.session.date ? parseStringToDate(selectedSession.session.date) : Date()
    )
    useEffect(() => {
        dispatch(setIsLoading(true))
        console.log(selectedSession)
        if (selectedSession) {
            storage.ref().child("SessionStories").child(selectedSession.session.story).getDownloadURL()
                .then(url => fetch(url)
                    .then(res => res.text())
                    .then(res => setSessionStory(res))
                )
                .catch(e => console.log("error", e))
            dispatch(setIsLoading(false))
        }
    }, [dispatch, selectedSession])
    const submitSession = () => {
        if (!sessionTitle) {
            setSessionTitleError(true);
            return;
        }
        if (selectedCampaign?.id && sessionStory && sessionDate) {
            try {
                if (sessionDate) {
                    let sessionMDFile = sessionFile ? sessionFile : selectedCampaign.id + sessionTitle + sessionDate + ".md"
                    const toUpload = {
                        campaign: selectedCampaign.id,
                        date: sessionDate,
                        story: sessionMDFile,
                        title: sessionTitle,
                        campaignTitle: selectedCampaign.campaignTitle
                    }
                    console.log(sessionsId)
                    if (sessionsId) {
                        campaignsRef.child(selectedCampaign.id).child("sessions").child(sessionsId).set(toUpload).then((e) => {
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
                        date: sessionDate
                    };
                    console.log(file)
                    firebaseStorageRef.child("SessionStories").child(sessionMDFile).put(file, metadata)
                    history.push("/campaign/session")
                }
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
    if (!selectedSession) {
        return (<Redirect to="/" />)
    }
    return (
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
            <MdEditor
                style={{ height: "500px" }}
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

export default CampaignEdit;
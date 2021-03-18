import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NEW_SESSION, OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { setAlertDialog } from "../../store/admin/adminCreator";
import styled from "styled-components";
import { getNewSessionDay } from "../../store/campaign/campaignSelectors";
import { setSelectedSession } from "../../store/selected/selectedCreators";
import { database } from "../../firebase";
export interface CampaignSessionNewProps { }

const CampaignSessionNew: React.FC<CampaignSessionNewProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedCampaign = useSelector(
    (state: RootReducerProp) => state.selected.selectedCampaign
  );

  const sessionDay = useSelector(getNewSessionDay);
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const [sessionSubTitle, setSessionSubTitle] = useState<string>("");
  const [sessionTitleError, setSessionTitleError] = useState<boolean>(false);

  const [sessionDate, setSessionDate] = useState<string>(
    new Date().toDateString()
  );

  const submitSession = () => {
    if (selectedCampaign) {
      if (!sessionTitle) {
        setSessionTitleError(true);
        dispatch(
          setAlertDialog("Please fille out the Session Title", true, true)
        );
        return;
      }

      const toUpload: ISession = {
        ...NEW_SESSION,
        date: sessionDate ? sessionDate : new Date().toDateString(),
        title: sessionTitle,
        subTitle: sessionSubTitle ? sessionSubTitle : "",
        campaignTitle: selectedCampaign.campaign.title,
        sessionDay: sessionDay ? sessionDay : 1,
        slug: sessionTitle.replace(/\s/g, ""),
      };
      database.ref(`campaigns/${selectedCampaign.id}/sessions`)
        .push(toUpload)
        .then((snap) => {
          snap.once("value", async (snapshot: any) => {
            dispatch(
              setSelectedSession({ id: snapshot.key, session: snapshot.val() })
            );
            history.push(
              `/${selectedCampaign.campaign.slug}/sessions/${toUpload.slug}/edit`
            );
          });
        });
    }
  };

  if (!selectedCampaign) {
    return <IsLoading />;
  }
  return (
    <TitleContainer>
      <TextField
        id="outlined-multiline-static"
        placeholder="Write a fitting title"
        variant="filled"
        disabled={false}
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
        label="Session day"
        placeholder="Which session is this?"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "90%", margin: "1rem" }}
        value={sessionDay}
        disabled={false}
      />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          style={{ margin: "1rem" }}
          clearable
          disableFuture
          value={sessionDate}
          onChange={(date) =>
            setSessionDate(
              date ? date.toDateString() : new Date().toDateString()
            )
          }
        />
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "2rem" }}
        onClick={submitSession}
      >
        Continue
      </Button>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  background-color: ${OLD_WHITE};
  width: 50%;
  min-width: 15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
export default CampaignSessionNew;

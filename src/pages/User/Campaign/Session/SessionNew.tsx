import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NEW_SESSION, OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import styled from "styled-components";
import { getNewSessionDay } from "../../../../store/campaign/campaignSelectors";
import { database } from "../../../../services/Firebase/firebase";
import {
  getSelectedCampaign,
  getSelectedCampaignDatabasePath,
} from "../../../../store/selected/selectedSelectors";
import useOwner from "../../../../store/hooks/useOwner";
import { useTranslation } from "react-i18next";
export interface SessionNewProps { }

const SessionNew: React.FC<SessionNewProps> = () => {
  const history = useHistory();
  const owner = useOwner();
  const translate = useTranslation()
  const selectedCampaign = useSelector(getSelectedCampaign);

  const sessionDay = useSelector(getNewSessionDay);
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const [sessionSubTitle, setSessionSubTitle] = useState<string>("");
  const selectedCampaignDatabasePath = useSelector(
    getSelectedCampaignDatabasePath
  );
  const [sessionTitleError, setSessionTitleError] = useState<boolean>(false);

  const [sessionDate, setSessionDate] = useState<string>(
    new Date().toDateString()
  );

  const submitSession = () => {
    if (selectedCampaign) {
      if (!sessionTitle) {
        setSessionTitleError(true);
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
      database
        .ref(`${selectedCampaignDatabasePath}/sessions`)
        .push(toUpload)
        .then((snap) => {
          snap.once("value", async (snapshot: any) => {
            history.push(
              `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/sessions/${toUpload.slug}`
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
        placeholder={translate.t(`Write a fitting title`)}
        variant="filled"
        disabled={false}
        style={{ width: "90%", margin: "1rem" }}
        label={translate.t(`Title`)}
        error={sessionTitleError}
        value={sessionTitle}
        onChange={(event) => setSessionTitle(event.target.value)}
      />

      <TextField
        placeholder={translate.t(`Write a fitting subtitle`)}
        style={{ width: "90%", margin: "1rem" }}
        variant="filled"
        label={translate.t(`Subtitle`)}
        value={sessionSubTitle}
        onChange={(event) => setSessionSubTitle(event.target.value)}
      />
      <TextField
        label={translate.t(`Session number`)}
        placeholder={translate.t(`Which session is this?`)}
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
        {translate.t(`Continue`)}
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
export default SessionNew;

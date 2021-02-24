import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sortSessionsByDateValue from "../../utils/sortArrayDyDate";
import { useHistory } from "react-router-dom";

import Scroll from "../../components/Scroll/Scroll";
import { getAllSessions } from "../../store/campaign/campaignSelectors";
import { MAX_NUM_SCROLLS_HOMEPAGE } from "../../assets/constants/Constants";
import styled from "styled-components";
import { storage } from "../../firebase";

type HomeProps = {};
const Home: FunctionComponent<HomeProps> = () => {
  const history = useHistory();
  const sessions = useSelector(getAllSessions);
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    storage
      .ref("Images/Background/dnd_background.jpg")
      .getDownloadURL()
      .then((url: string) => setImageUrl(url))
  }, []);
  const renderScrolls = () => {
    if (sessions) {
      let sortedSessions = sortSessionsByDateValue(sessions);
      return sortedSessions
        .slice(0, MAX_NUM_SCROLLS_HOMEPAGE)
        .map((session: any, index: number) => {
          return (
            <Scroll
              key={session.session.sessionId}
              id={session.sessionId}
              title={session.session.title}
              subTitle={session.session.subTitle}
              date={session.session.date}
              campaignTitle={session.session.campaignTitle}
              sessionDay={session.session.sessionDay}
              onClick={() => {
                history.push(`${session.session.campaignTitle.replace(/\s/g, '')}/${session.session.slug}`);
              }}
            />
          );
        });
    }
  };
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      {" "}
      <div style={{ width: "50%", minWidth: "20rem" }}>
        {sessions ? renderScrolls() : null}
      </div>
    </Container>
  );
};

const Container = styled.div`
  z-index: 300;
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default Home;

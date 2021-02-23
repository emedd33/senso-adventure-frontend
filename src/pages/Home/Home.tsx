import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CosTitle from "../../assets/backgroundImage/CosTitle.png";
import sortSessionsByDateValue from "../../utils/sortArrayDyDate";
import { useHistory } from "react-router-dom";
import {
  setBackgroundImageFromFirebase,
} from "../../store/selected/selectedCreators";
import Scroll from "../../components/Scroll/Scroll";
import { CampaignTitleImageFileLocation, storage } from "../../firebase";
import { getAllSessions } from "../../store/campaign/campaignSelectors";
import { MAX_NUM_SCROLLS_HOMEPAGE } from "../../assets/constants/Constants";
import styled from "styled-components";

type HomeProps = {};
const Home: FunctionComponent<HomeProps> = () => {
  const [, setCampaingTitles] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const sessions = useSelector(getAllSessions);
  const imageUrl = useSelector(
    (state: RootReducerProp) => state.selected.backgroundImage
  );
  useEffect(() => {
    storage
      .ref(CampaignTitleImageFileLocation)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          item.getMetadata().then((data) =>
            setCampaingTitles((titles) => {
              return { ...titles, title: data };
            })
          );
        });
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    dispatch(setBackgroundImageFromFirebase("dnd_background.jpg"));
  }, [dispatch]);
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
              storyImage={CosTitle}
              sessionDay={session.session.sessionDay}
              campaign={session.campaignId}
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollImage from "../../assets/backgroundImage/scroll.png";
import { storage } from "../../firebase";
import px2vw from "../../utils/px2vw";

import "./Scroll.scss";
type ScrollProps = {
  id: any;
  title: string;
  subTitle: string;
  date: string;
  sessionDay: number;
  campaignTitle: string;
  onClick: any;
};

function Scroll({
  id,
  title,
  subTitle,
  date,
  sessionDay,
  campaignTitle,
  onClick,
}: ScrollProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    storage.ref()
      .child("Campaigns")
      .child(campaignTitle)
      .child("TitleImage")
      .getDownloadURL()
      .then(url => setImageUrl(url))
      .catch(e => console.log("could not fetch TitleImage for scroll"))
  }, [campaignTitle])
  return (
    <div
      style={{
        zIndex: 20,
        width: "100%",
        justifyContent: "center",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <ScrollContainer
        onClick={onClick}
        className={onClick ? "scroll-container-active" : "scroll-container"}
      >
        <ScrollContent>
          <div>
            <h1 style={{ margin: 0, opacity: 0.7 }}>
              Session day: {sessionDay}
            </h1>
            <ScrollDate>{date}</ScrollDate>
          </div>
          <div>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <StoryImage src={imageUrl} alt="" />
            </div>
            <ScrollTitle>{title}</ScrollTitle>
            <h3 style={{ color: "black", textAlign: "center" }}>{subTitle}</h3>
          </div>
        </ScrollContent>
      </ScrollContainer>
    </div>
  );
}
const StoryImage = styled.img`
  margintop: -1rem;
  width: 70%;
`;
const ScrollContent = styled.div`
  font-size: ${px2vw(20)};
  padding-top: 30%;
  padding-bottom: 35%;
  padding-right: 15%;
  padding-left: 15%;
  margin-left: 0;
`;

const ScrollTitle = styled.h1`
  text-align: center;
  opacity: 0.7;
  width: 100%;
`;

const ScrollContainer = styled.div`
  margin: ${px2vw(22)};
  width: 90%;
  min-width: 20rem;
  background-image: url(${ScrollImage});

  &:hover {
    width: 100%;
  }
`;

const ScrollDate = styled.h2`
  margin-top: -${px2vw(4)};
  margin-bottom: 0;
  opacity: 0.7;
`;
export default Scroll;

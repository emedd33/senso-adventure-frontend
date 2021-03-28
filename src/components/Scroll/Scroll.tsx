import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollImage from "../../assets/Images/scroll.png";
import { storage } from "../../services/Firebase/firebase";
import px2vw from "../../utils/px2vw";

type ScrollProps = {
  title: string;
  subTitle: string;
  date: string;
  sessionDay: number;
  campaignSlug: string;
  onClick: any;
  isOpaque: boolean;
  owner?: string;
};

function Scroll({
  title,
  subTitle,
  date,
  sessionDay,
  campaignSlug,
  onClick,
  isOpaque,
  owner,
}: ScrollProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (owner && campaignSlug) {
      storage
        .ref(`users/${owner}/campaigns/${campaignSlug}/TitleImage`)
        .getDownloadURL()
        .then((url) => setImageUrl(url))
        .catch((e) => console.log("could not fetch TitleImage for scroll"));
    }
  }, [campaignSlug, owner]);
  return (
    <ScrollButton onClick={onClick}>
      <ScrollContainer style={isOpaque ? { opacity: 0.5 } : {}}>
        <div>
          <h5 style={{ margin: 0, opacity: 0.7 }}>Session day: {sessionDay}</h5>
          <ScrollDate>{date}</ScrollDate>
        </div>
        <div>
          <StoryImage src={imageUrl} alt="" />
          <ScrollTitle>{title}</ScrollTitle>
          <h5 style={{ color: "black", textAlign: "center", opacity: 0.7 }}>
            {subTitle ? subTitle : "Subtitle"}
          </h5>
        </div>
      </ScrollContainer>
    </ScrollButton>
  );
}
const ScrollButton = styled(Button)`
  margin: 3rem;
  margin-top: 5rem;
  width: 90%;
  height: 20rem;
  max-width: 30rem;
  padding: 1rem;
  transition: 300ms;
  display: flex;
  justify-content: center;
`;
const StoryImage = styled.img`
  margin-top: 1rem;
  width: 70%;
  max-height: 5rem;
  max-width: 15rem;
`;
const ScrollContainer = styled.div`
  background-image: url(${ScrollImage});
  height: 20rem;
  padding: 3rem;
  width: 80%;
  padding-bottom: 3rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: 250ms;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const ScrollTitle = styled.h3`
  text-align: center;
  opacity: 0.7;
`;

const ScrollDate = styled.h4`
  margin-top: -${px2vw(4)};
  margin-bottom: 0;
  opacity: 0.7;
`;
export default Scroll;

import { FunctionComponent } from "react";
import styled from "styled-components";
type HomeProps = {};
const Home: FunctionComponent<HomeProps> = () => {
  return <Container></Container>;
};
const Container = styled.div`
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-top: 10rem;
  min-height: 100vh;
`;

export default Home;

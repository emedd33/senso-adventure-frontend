import { FunctionComponent } from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/Images/background_home.jpg";
type NotFoundProps = {};
const NotFound: FunctionComponent<NotFoundProps> = () => {

    return (
        <Container>
            <h2>Page is not available</h2>
        </Container>
    );
};
const Container = styled.div`
  z-index: 300;
  display: flex;
  width:100%;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-top: 10rem;
  min-height: 100vh;
`;


export default NotFound;

import React from "react";
import {
    // useDispatch, 
    useSelector
} from "react-redux";
// import { useHistory } from "react-router-dom";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import styled from "styled-components";
import {
    getSelectedLocation,
    // getSelectedCampaign
} from "../../store/selected/selectedSelectors";
export interface CampaignLocationNewProps { }


const CampaignLocationNew: React.FC<CampaignLocationNewProps> = () => {
    // const dispatch = useDispatch();
    // const history = useHistory();

    // const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedLocation = useSelector(getSelectedLocation)



    if (!selectedLocation) {
        return <IsLoading />;
    }
    return (
        <Container>

        </Container>
    );
};
const Container = styled.div`
  width: 70%;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: flex;
  justify-content: space-between;
  align-center: center;
  flex-wrap: wrap;
  min-height: 20rem;
`;
export default CampaignLocationNew;

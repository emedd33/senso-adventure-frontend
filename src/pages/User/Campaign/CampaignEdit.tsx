import { OLD_WHITE } from "../../../assets/constants/Constants"
import styled from "styled-components";
import { getSelectedCampaign, getSelectedCampaignStoragePath, isDungeonMasterSelector } from "../../../store/selected/selectedSelectors";
import { useSelector } from "react-redux";
import useOwner from "../../../store/hooks/useOwner";
import IsLoading from "../../../components/IsLoading/IsLoading";
import { SensoDelete } from "../../../components/SensoInputs"
import SensoDraftJS from "../../../components/SensoDraftJS/SensoDraftJS";

type CampaignEditProps = {}
const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const selectedCampaignStoragePath = useSelector(getSelectedCampaignStoragePath);
    const owner = useOwner()
    if (selectedCampaign === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return <Container>
        <SensoDraftJS storagePath={`${selectedCampaignStoragePath}/CampaignLore.json`} readOnly={false} isDungeonMaster={isDungeonMaster} />
        <SensoDelete
            storagePath={`${selectedCampaignStoragePath}`}
            databasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedCampaign.id}`}
            instanceType="Character"
            linkPath={`/${selectedCampaign.campaign.slug}/monsters`}
        />
    </Container>
}
const Container = styled.div`
  width: 90%;
  padding: 1rem;
  z-index:200;
  margin-bottom:10rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  min-height: 20rem;
`;
export default CampaignEdit
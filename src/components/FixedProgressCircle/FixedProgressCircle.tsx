import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { OLD_WHITE } from '../../assets/constants/Constants';
export interface FixedProgressCircleProps {
}

const FixedProgressCircle: React.SFC<FixedProgressCircleProps> = () => {
    return (
        <Container >
            <CircularProgress />
        </Container>);
}

const Container = styled.div`
position: fixed; 
left: 5rem;
bottom: 5rem; 
padding: 1rem;
background-color: ${OLD_WHITE};
border-radius:3rem;
`
export default FixedProgressCircle;

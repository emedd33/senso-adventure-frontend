import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { createGame } from "./MapmakerGame"

const MapmakerIndex: React.FC = () => {
    const [app, setApp] = useState<any>();

    useMemo(() => {
        setApp(createGame())

    }, [])
    if (!app) {
        return null
    }
    return (
        <Container>

            <div style={{ marginTop: "10rem" }} ref={(canvasDiv) => {
                // Dont add more element to this div due to the childElementcount check below
                if (canvasDiv?.childElementCount === 0) {
                    canvasDiv?.appendChild(app.view)
                }
            }} />
        </Container>
    );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default MapmakerIndex;

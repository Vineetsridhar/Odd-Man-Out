import { useEffect, useState, useSyncExternalStore } from "react";
import omoLogo from "./assets/omo-logo.png";
import { useFirebaseDatabase } from "./hooks/useFirebaseDatabase";
import styled from "styled-components";
import { colors } from "./colors";
import { ToggleOptions } from "./types";
import { ToggleSwitch } from "./components/ToggleSwitch";

const ParentClass = styled.div`
  display: grid;
  grid-template-rows: 3;
  grid-template-columns: 2;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.backgroundColor};
  color: ${colors.textColor};
  font-family: sans-serif;
  padding: 24px;
`;
const LandingPageInput = styled.input`
  background-color: ${colors.secondaryBackgroundColor};
  color: ${colors.textColor};
  margin: 8px 0px;
`;
const Logo = styled.img`
  height: 400px;
`;
const PlayButton = styled.button`
  margin: 24px 0px;
  background-color: ${colors.green};
  border-radius: 16px;
  border: 1px solid ${colors.backgroundColor};
  box-shadow: 0px 0px 8px 8px ${colors.greenShadow};
  font-size: 50px;
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
`;
const SettingsSection = styled.div`
  grid-row: 1;
  grid-column: 2;
`;
const DescriptionSection = styled.div`
  grid-row: 3;
  grid-column: 1;
`;

function App() {
  const [localName, setLocalName] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("room code");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");

  return (
    <ParentClass>
      <Logo src={omoLogo} className="logo" alt="Odd Man Out Logo"></Logo>
      <SettingsSection>
        <h1>Nickname</h1>
        <LandingPageInput
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
        <ToggleSwitch
          activeToggleOption={activeToggleOption}
          onToggleChange={setActiveToggleOption}
        />
        {activeToggleOption === "join" && (
          <LandingPageInput
            type="text"
            value={localRoomCode}
            onChange={(e) => setLocalRoomCode(e.target.value)}
          />
        )}
      </SettingsSection>
      <PlayButton className="play">PLAY</PlayButton>
      <DescriptionSection>Description, Rules, etc.</DescriptionSection>
    </ParentClass>
  );
}

export default App;

import { useEffect, useState, useSyncExternalStore } from "react";
import omoLogo from "./assets/omo-logo.png";
import { useFirebaseDatabase } from "./hooks/useFirebaseDatabase";
import styled from "styled-components";
import { colors } from "./colors";
import { ToggleOptions } from "./types";
import { ToggleSwitch } from "./components/ToggleSwitch";

const ParentClass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.backgroundColor};
  color: ${colors.textColor};
  font-family: sans-serif;
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
  margin: 8px 0px;
`;

function App() {
  const [localName, setLocalName] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("room code");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");

  return (
    <ParentClass>
      <Logo src={omoLogo} className="logo" alt="Odd Man Out Logo"></Logo>
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
      <PlayButton className="play">PLAY</PlayButton>
    </ParentClass>
  );
}

export default App;

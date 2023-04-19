import { useEffect, useState, useSyncExternalStore } from "react";
import omoLogo from "./assets/omo-logo.png";
import { useFirebaseDatabase } from "./hooks/useFirebaseDatabase";
import styled from "styled-components";
import { colors } from "./colors";
import { ToggleOptions } from "./types";
import { ToggleSwitch } from "./components/ToggleSwitch";
import "./App.css";

const ParentClass = styled.div`
  display: grid;
  align-items: top;
  justify-content: center;
  grid-template-rows: 500px;
  grid-template-columns: 500px 350px;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.backgroundColor};
  color: ${colors.textColor};
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  padding: 24px;
`;
const Logo = styled.img`
  height: 400px;
`;
const SettingsSection = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LandingPageInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  width: 100%;
`;
const RedLabel = styled.h1`
  color: ${colors.redGlowInner};
  text-shadow: 0 0 10px ${colors.red};
  font-size: 0.8em;
  position: absolute;
  transform: translateX(10px) translateY(-24px);
  padding: 2px 10px;
  pointer-events: none;
  background-color: ${colors.backgroundColor};
  border-left: 2px solid ${colors.red};
  border-right: 2px solid ${colors.red};
`;
const LandingPageInput = styled.input`
  background-color: ${colors.backgroundColor};
  border: 2px solid ${colors.red};
  width: 100%;
  color: ${colors.textColor};
  font-size: 1em;
  border-radius: 4px;
  height: 20px;
  padding: 12px;
  outline: none;
`;
const PlayButton = styled.button`
  height: 64px;
  background-color: ${colors.greenGlowInner};
  border-radius: 16px;
  border: 0;
  box-shadow: 0px 0px 8px 8px ${colors.greenGlowOutter};
  font-size: 40px;
  grid-row: 2;
  grid-column: span 2;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
`;
const DescriptionSection = styled.div`
  grid-row: 3;
  grid-column: 1;
`;
function App() {
  const [localName, setLocalName] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");

  return (
    <ParentClass>
      <Logo src={omoLogo} className="logo" alt="Odd Man Out Logo"></Logo>
      <SettingsSection>
        <LandingPageInputContainer>
          <RedLabel>Nickname</RedLabel>
          <LandingPageInput
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
        </LandingPageInputContainer>
        <ToggleSwitch
          activeToggleOption={activeToggleOption}
          onToggleChange={setActiveToggleOption}
        />
        {activeToggleOption === "join" && (
          <LandingPageInputContainer>
            <RedLabel>Room code</RedLabel>
            <LandingPageInput
              type="text"
              value={localRoomCode}
              onChange={(e) => setLocalRoomCode(e.target.value)}
            />
          </LandingPageInputContainer>
        )}
      </SettingsSection>
      <PlayButton className="play">Play</PlayButton>
      <DescriptionSection>Description, Rules, etc.</DescriptionSection>
    </ParentClass>
  );
}

export default App;

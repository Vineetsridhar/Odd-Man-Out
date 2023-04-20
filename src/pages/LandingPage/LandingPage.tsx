import { useState } from "react";
import OddManOutLogo from "../../assets/omo-logo.png";
import styled from "styled-components";
import { colors } from "../../colors";
import { ToggleOptions } from "../../types";
import { LabeledInput } from "../../components/LabeledInput";
import { ToggleSwitch } from "../../components/ToggleSwitch";

const Logo = styled.img`
  min-width: 200px;
  max-width: 450px;
  width: 100%;
  object-fit: contain;
  grid-area: logo;
`;
const ParentClass = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-columns: 4fr 3fr;
  grid-template-areas:
    "logo settings"
    "play-button play-button"
    "description description";
  column-gap: 32px;
  row-gap: 64px;
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  padding: 24px 20%;
  max-width: 1000px;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    ${Logo} {
      max-width: 300px;
    }
  }
`;
const SettingsSection = styled.div`
  grid-area: settings;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlayButton = styled.button`
  height: 64px;
  background-color: ${colors.greenGlowInner};
  border-radius: 16px;
  border: 0;
  box-shadow: 0px 0px 8px 8px ${colors.greenGlowOutter};
  font-size: 2.5rem;
  grid-area: play-button;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;
const DescriptionSection = styled.div`
  grid-area: description;
`;
export const LandingPage = () => {
  const [localName, setLocalName] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");

  return (
    <ParentClass>
      <Logo src={OddManOutLogo} className="logo" alt="Odd Man Out Logo"></Logo>
      <SettingsSection>
        <LabeledInput
          label="Nickname"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
        <ToggleSwitch
          activeToggleOption={activeToggleOption}
          onToggleChange={setActiveToggleOption}
        />
        {activeToggleOption === "join" && (
          <LabeledInput
            label="Room Code"
            value={localRoomCode}
            onChange={(e) => setLocalRoomCode(e.target.value)}
          />
        )}
      </SettingsSection>
      <PlayButton className="play">Play</PlayButton>
      <DescriptionSection>Description, Rules, etc.</DescriptionSection>
    </ParentClass>
  );
};

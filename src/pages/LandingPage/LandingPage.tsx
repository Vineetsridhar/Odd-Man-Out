import { useState } from "react";
import OddManOutLogo from "../../assets/omo-logo.png";
import OddManOutDescriptionOne from "../../assets/omo-description-1.png";
import OddManOutDescriptionTwo from "../../assets/omo-description-2.png";
import styled from "styled-components";
import { colors } from "../../colors";
import { ToggleOptions } from "../../types";
import { LabeledInput } from "../../components/LabeledInput";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { createNewRoom, joinRoom } from "../../database/helpers";

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
  grid-template-rows: 2fr auto auto;
  grid-template-columns: 4fr 3fr;
  grid-template-areas:
    "logo settings"
    "play-button play-button"
    "description description"
    "images images"
    "rules rules";
  column-gap: 32px;
  row-gap: 64px;
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  padding: 24px 20%;
  max-width: 1000px;

  @media (max-width: 900px) {
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
  gap: 32px;
  margin-top: 32px;
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
  font-family: "Barlow", sans-serif;
  cursor: pointer;
`;
const DescriptionSection = styled.p`
  grid-area: description;
  font-size: 1.5em;
  color: ${colors.textColor};
  text-transform: initial;
`;
const DescriptionImages = styled.div`
  grid-area: images;
  display: flex;
  justify-content: center;
  img {
    min-width: 100px;
    max-width: 400px;
    width: 100%;
    object-fit: contain;
    padding: 0 32px;
  }
`;
const RulesSection = styled.div`
  grid-area: rules;
  border-top: 2px solid ${colors.red};
  padding: 24px;
  margin: 32px 0 0 0;
  h1 {
    font-size: 2em;
    color: ${colors.redGlowInner};
    text-shadow: 0 0 10px ${colors.red};
    position: absolute;
    transform: translateX(16px) translateY(-64px);
    padding: 0px 8px;
    background-color: ${colors.backgroundColor};
    border-left: 2px solid ${colors.red};
    border-right: 2px solid ${colors.red};
  }
  li {
    font-size: 1.5em;
    color: ${colors.textColor};
    text-transform: initial;
    margin: 24px;
  }
`;
const HideableDiv = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  max-height: ${(props) => (props.visible ? "200px" : "0px")};
  transition: all 0.2s ease-in-out;
`;

export const LandingPage = () => {
  const [nickname, setNickname] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");

  const handleOnPlayButtonClicked = () => {
    if (nickname === "") {
      alert("Please enter a nickname");
      return;
    }
    if (activeToggleOption === "join") {
      joinRoom(localRoomCode, nickname).catch((error) => alert(error.message));
    } else {
      createNewRoom(nickname);
    }
  };

  return (
    <ParentClass>
      <Logo src={OddManOutLogo} className="logo" alt="Odd Man Out Logo"></Logo>
      <SettingsSection>
        <LabeledInput
          label="Nickname"
          value={nickname}
          onChange={(e) =>
            setNickname(e.target.value.toLocaleUpperCase().slice(0, 50))
          }
        />
        <ToggleSwitch
          activeToggleOption={activeToggleOption}
          onToggle={() =>
            setActiveToggleOption(
              activeToggleOption === "join" ? "create" : "join"
            )
          }
        />
        <HideableDiv visible={activeToggleOption === "join"}>
          <LabeledInput
            label="Room Code"
            value={localRoomCode}
            onChange={(e) =>
              setLocalRoomCode(e.target.value.toLocaleUpperCase().slice(0, 4))
            }
          />
        </HideableDiv>
      </SettingsSection>
      <PlayButton className="play" onClick={handleOnPlayButtonClicked}>
        Play
      </PlayButton>
      <DescriptionSection>
        Odd Man Out is a thrilling and deceptive game that tests your ability to
        blend in and detect subtle differences in responses. In each round, a
        group of players is asked a question, but one player - the "Odd Man Out"
        - receives a slightly different question. The challenge for the players
        is to identify who the Odd Man Out is, while the Odd Man Out must try to
        blend in and avoid detection.
      </DescriptionSection>
      <DescriptionImages>
        <img src={OddManOutDescriptionOne} alt="Odd Man Out Description"></img>
        <img src={OddManOutDescriptionTwo} alt="Odd Man Out Description"></img>
      </DescriptionImages>
      <RulesSection>
        <h1>How to Play</h1>
        <ul>
          <li>
            Gather a group of friends (ideally 4 or more) and choose one person
            to host the game
          </li>
          <li>
            Once all players have joined the game using the room code, the host
            can begin the game
          </li>
          <li>
            All players will receive the same question, except for the Odd Man
            Out, who will receive a slightly different one
          </li>
          <li>
            Each player, including the Odd Man Out, will submit their answer
            which will be displayed to everyone
          </li>
          <li>
            Players will then discuss and try to determine who the Odd Man Out
            is
          </li>
          <li>
            Players that vote for the correct Odd Man Out first will recieve the
            most points while the Odd Man Out gains points for being detected by
            as little players as possible
          </li>
          <li>
            The game will continue for the specified number of rounds. After the
            final round, the player with the most points wins
          </li>
        </ul>
      </RulesSection>
    </ParentClass>
  );
};

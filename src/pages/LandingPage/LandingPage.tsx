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
    "description description";
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
const DescriptionSection = styled.div`
  grid-area: description;
  h1 {
    color: ${colors.redGlowInner};
    text-shadow: 0 0 10px ${colors.red};
  }
  p {
    color: ${colors.textColor};
    text-transform: initial;
  }
  li {
    color: ${colors.textColor};
    text-transform: initial;
  }
  div {
    display: flex;
    justify-content: center;
  }
  img {
    height: 300px;
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
        <p>
          Odd Man Out is a thrilling and deceptive trivia game that tests your
          ability to blend in and detect subtle differences in responses. In
          each round, a group of players is asked a question, but one player -
          the "Odd Man Out" - receives a slightly different question. The
          challenge for the players is to identify who the Odd Man Out is, while
          the Odd Man Out must try to blend in and avoid detection.
        </p>
        <div>
          <img
            src={OddManOutDescriptionOne}
            alt="Odd Man Out Description"
          ></img>
          <img
            src={OddManOutDescriptionTwo}
            alt="Odd Man Out Description"
          ></img>
        </div>
        <h1>How to Play:</h1>
        <ul>
          <li>Gather a group of friends (ideally 4 or more)</li>
          <li>
            Choose one person to host the game, ensuring they have the ability
            to share their screen with the rest of the players.
          </li>
          <li>
            Once all players have joined the game, the host can begin the game.
            All players will receive the same question, except for the Odd Man
            Out, who will receive a slightly different one.
          </li>
          <li>
            Each player, including the Odd Man Out, will type their answer into
            the platform.
          </li>
          <li>
            After all answers have been submitted, everyone's answer will be
            displayed on the screen.
          </li>
          <li>
            Players must pay close attention to each response to identify any
            differences.
          </li>
          <li>
            After everyone has submitted their answers, the players will discuss
            and try to determine who the Odd Man Out is.
          </li>
          <li>
            The Odd Man Out wins if they successfully avoid detection. The other
            players win if they correctly identify the Odd Man Out.
          </li>
        </ul>
        <p>
          Odd Man Out Online is a captivating and suspenseful game that
          encourages critical thinking, observation, and social deduction.
          Perfect for virtual game nights or remote gatherings, this game will
          leave players constantly guessing and eager to play again.
        </p>
      </DescriptionSection>
    </ParentClass>
  );
};

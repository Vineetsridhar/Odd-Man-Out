import { useState } from "react";
import OddManOutLogo from "../../assets/omo-logo.png";
import OddManOutDescriptionOne from "../../assets/omo-description-1.png";
import OddManOutDescriptionTwo from "../../assets/omo-description-2.png";
import { ToggleOptions } from "../../types";
import { LabeledInput } from "../../components/LabeledInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { createNewRoom, joinRoom } from "../../database/helpers";
import {
  DescriptionImages,
  DescriptionSection,
  HideableDiv,
  Logo,
  ParentClass,
  PlayButton,
  RulesSection,
  SettingsSection,
} from "./styled";
import { setRoomCode } from "../../useGlobalState";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routeHelpers";

export const LandingPage = () => {
  const [nickname, setNickname] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");
  const navigate = useNavigate();

  const handleOnPlayButtonClicked = () => {
    if (nickname === "") {
      alert("Please enter a nickname");
      return;
    }
    if (activeToggleOption === "join") {
      joinRoom(localRoomCode, nickname).catch((error) => alert(error.message));
      setRoomCode(localRoomCode);
      navigate(ROUTES.lobby);
    } else {
      createNewRoom(nickname);
      setRoomCode(localRoomCode);
      navigate(ROUTES.lobby);
    }
  };

  return (
    <ParentClass>
      <Logo src={OddManOutLogo} className="logo" alt="Odd Man Out Logo"></Logo>
      <SettingsSection>
        <LabeledInput
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value.slice(0, 50))}
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

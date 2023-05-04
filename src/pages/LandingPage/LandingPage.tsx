import { useEffect, useState } from "react";
import OddManOutLogo from "../../assets/omo-logo.png";
import OddManOutDescriptionOne from "../../assets/omo-description-1.png";
import OddManOutDescriptionTwo from "../../assets/omo-description-2.png";
import { ToggleOptions } from "../../types";
import { LabeledInput } from "../../components/LabeledInput";
import { ToggleSwitch } from "./ToggleSwitch";
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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routeHelpers";
import { createRoom, joinRoom, rejoinRoom } from "./helpers";
import { showErrorToast } from "../../toastHelpers";

export const LandingPage = () => {
  const [nickname, setNickname] = useState("");
  const [localRoomCode, setLocalRoomCode] = useState("");
  const [activeToggleOption, setActiveToggleOption] =
    useState<ToggleOptions>("join");
  const navigate = useNavigate();

  useEffect(() => {
    const attemptJoinRoom = async () => {
      try {
        await rejoinRoom();
        navigate(ROUTES.lobby);
      } catch (e) {
        console.error(e);
      }
    };
    attemptJoinRoom();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get("roomCode");
    if (roomCode) {
      setLocalRoomCode(roomCode.slice(0, 4).toLocaleUpperCase());
      setActiveToggleOption("join");
    }
  }, []);

  const handleOnPlayButtonClicked = async () => {
    if (nickname === "") {
      showErrorToast("Please enter a nickname");
      return;
    }
    try {
      if (activeToggleOption === "join") {
        await joinRoom(nickname, localRoomCode);
      } else {
        await createRoom(nickname);
      }
      navigate(ROUTES.lobby);
    } catch (error: any) {
      showErrorToast(error.message);
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
          placeholder="John Doe"
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
            placeholder="ABCD"
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

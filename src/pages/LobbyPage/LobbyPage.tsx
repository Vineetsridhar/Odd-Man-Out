import styled from "styled-components";
import { colors } from "../../colors";
import { useGlobalState } from "../../useGlobalState";
import { useFirebaseDatabase } from "../../hooks/useFirebaseDatabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../routeHelpers";
import { LeaveGameButton } from "../../components/LeaveGameButton";

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 2rem;
  color: ${colors.textColor};
  font-family: "Barlow", sans-serif;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;
const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Player = styled.li<{ isHost: boolean }>`
  font-size: 1.5rem;
  color: ${colors.textColor};
  font-family: "Barlow", sans-serif;

  ${({ isHost }) =>
    isHost &&
    `
    font-weight: bold;
  `}
`;
const StartGameButton = styled.button`
  font-size: 1.5rem;
  color: ${colors.textColor};
  background-color: ${colors.green};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 32px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  font-family: "Barlow", sans-serif;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LobbyPage = () => {
  const roomCode = useGlobalState((state) => state.roomCode);
  const isHost = useGlobalState((state) => state.isHost);
  const userId = useGlobalState((state) => state.userId);
  const players = useGlobalState((state) => state.players);

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomCode) {
      navigate(ROUTES.root);
    }
  }, []);

  return (
    <LobbyContainer>
      <Header>Lobby {roomCode}</Header>
      <PlayerList>
        {players &&
          players.map(({ id, nickname, isHost: isPlayerHost }) => (
            <PlayerRow key={id}>
              <Player isHost={isPlayerHost}>{nickname}</Player>
              {isHost && id !== userId && <button onClick={() => {}}>X</button>}
            </PlayerRow>
          ))}
      </PlayerList>
      <LeaveGameButton />

      {isHost && (
        <StartGameButton onClick={() => roomCode /*&& startGame(roomCode)*/}>
          Start Game
        </StartGameButton>
      )}
    </LobbyContainer>
  );
};

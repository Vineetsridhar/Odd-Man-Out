import styled from "styled-components";
import { colors } from "../../colors";
import { useGlobalState } from "../../useGlobalState";
import { useFirebaseDatabase } from "../../hooks/useFirebaseDatabase";
import { GameUsers } from "../../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../routeHelpers";
import { kickPlayer, startGame } from "../../database/helpers";
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

  const navigate = useNavigate();
  const [players] = useFirebaseDatabase<GameUsers>(`${roomCode}/users`);

  useEffect(() => {
    if (!roomCode) {
      navigate(ROUTES.root);
    }
  }, []);

  useEffect(() => {
    if (!players || !userId) return;

    const currentPlayer = players[userId];
    if (!currentPlayer) {
      navigate(ROUTES.root);
    }
  }, [players, userId]);

  return (
    <LobbyContainer>
      <Header>Lobby {roomCode}</Header>
      <PlayerList>
        {players &&
          Object.entries(players).map(
            ([id, { nickname, isHost: isPlayerHost }]) => (
              <PlayerRow>
                <Player isHost={isPlayerHost} key={id}>
                  {nickname}
                </Player>
                {isHost && id !== userId && (
                  <button onClick={() => kickPlayer(roomCode!, id)}>X</button>
                )}
              </PlayerRow>
            )
          )}
      </PlayerList>
      <LeaveGameButton />

      {isHost && (
        <StartGameButton onClick={() => roomCode && startGame(roomCode)}>
          Start Game
        </StartGameButton>
      )}
    </LobbyContainer>
  );
};

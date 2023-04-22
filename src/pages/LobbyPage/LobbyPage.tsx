import styled from "styled-components";
import { colors } from "../../colors";
import { useGlobalState } from "../../useGlobalState";
import { useFirebaseDatabase } from "../../hooks/useFirebaseDatabase";
import { GameUsers } from "../../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../routeHelpers";

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 2rem;
  color: ${colors.textColor};
`;
const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;
const Player = styled.li<{ isHost: boolean }>`
  font-size: 1.5rem;
  color: ${colors.textColor};

  ${({ isHost }) =>
    isHost &&
    `
    font-weight: bold;
  `}
`;

export const LobbyPage = () => {
  const roomCode = useGlobalState((state) => state.roomCode);
  const navigate = useNavigate();
  const [players] = useFirebaseDatabase<GameUsers>(`rooms/${roomCode}/users`);

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
          Object.values(players).map(({ nickname, isHost }) => (
            <Player isHost={isHost} key={nickname}>
              {nickname}
            </Player>
          ))}
      </PlayerList>
    </LobbyContainer>
  );
};

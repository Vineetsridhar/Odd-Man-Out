import styled from "styled-components";
import { colors } from "../../colors";
import { useGlobalState } from "../../useGlobalState";

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 2rem;
  color: ${colors.textColor};
`;

export const LobbyPage = () => {
  const roomCode = useGlobalState((state) => state.roomCode);

  return (
    <LobbyContainer>
      <Header>Lobby {roomCode}</Header>
    </LobbyContainer>
  );
};

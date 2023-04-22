import styled from "styled-components";
import { colors } from "../colors";
import { kickPlayer } from "../database/helpers";
import { useGlobalState } from "../useGlobalState";
import { redirect, useNavigate } from "react-router-dom";
import { ROUTES } from "../routeHelpers";

const LeaveRoomButton = styled.button`
  font-size: 1.5rem;
  position: absolute;
  top: 32px;
  left: 32px;
  color: ${colors.textColor};
  background-color: ${colors.red};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  font-family: "Barlow", sans-serif;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LeaveGameButton = () => {
  const roomCode = useGlobalState((state) => state.roomCode);
  const userId = useGlobalState((state) => state.userId);
  const navigate = useNavigate();

  const handleRoomLeave = () => {
    kickPlayer(roomCode!, userId!);
    navigate(ROUTES.root);
  };
  if (roomCode && userId) {
    return (
      <LeaveRoomButton onClick={handleRoomLeave}>Leave Room</LeaveRoomButton>
    );
  }
  return null;
};

import { BASE_URL, User } from "../../types";
import { setRoomPlayers } from "../../useGlobalState";

export const handleUsersChanged = (newUsers: User[]) =>
  setRoomPlayers(newUsers);

export const handleGameStarted = () => {
  console.log("Game started");
};

export const startGame = async () => {
  const response = await fetch(`${BASE_URL}/game/start`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }

  return data;
};

import { BASE_URL, Room, User } from "../../types";
import { setRoomPlayers, updateRoomData } from "../../useGlobalState";
import { DateTime } from "luxon";

type RoomObject = { room: Room; user: User };

export const createRoom = async (nickname: string): Promise<RoomObject> => {
  const response = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ nickname }),
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }

  updateRoomData(
    data.room.roomCode,
    nickname,
    data.user.sessionId,
    data.user.isHost
  );
  setRoomPlayers([data.user]);
  return data;
};

export const joinRoom = async (
  nickname: string,
  roomCode: string
): Promise<RoomObject> => {
  const response = await fetch(`${BASE_URL}/rooms/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ nickname, roomCode }),
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }

  updateRoomData(roomCode, nickname, data.user.sessionId, data.user.isHost);
  setRoomPlayers(data.room.users);
  return data;
};

export const rejoinRoom = async () => {
  const reponse = await fetch(`${BASE_URL}/rooms/join`, {
    method: "GET",
    credentials: "include",
  });
  const data = await reponse.json();

  if (reponse.status !== 200) {
    throw new Error(data.error);
  }

  updateRoomData(
    data.room.roomCode,
    data.user.nickname,
    data.user.sessionId,
    data.user.isHost
  );
  setRoomPlayers(data.room.users);
  return data;
};

import { BASE_URL, Session, User } from "../../types";
import { resetRoomData, updateRoomData } from "../../useGlobalState";
import { DateTime } from "luxon";

type SessionObject = { session: Session; user: User };
export const saveRoomData = (
  roomCode: string,
  nickname: string,
  userId: number,
  isHost: boolean
) => {
  localStorage.setItem("roomCode", roomCode);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("userId", userId.toString());

  updateRoomData(roomCode, nickname, userId, isHost);
};

export const clearRoomData = () => {
  localStorage.removeItem("roomCode");
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");
  resetRoomData();
};

export const createRoom = async (nickname: string): Promise<SessionObject> => {
  const response = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname }),
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  saveRoomData(data.session.roomCode, nickname, data.user.id, true);
  return data;
};

export const joinRoom = async (
  nickname: string,
  roomCode: string
): Promise<SessionObject> => {
  const response = await fetch(`${BASE_URL}/sessions/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, roomCode }),
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  saveRoomData(roomCode, nickname, data.user.id, false);
  return data;
};

export const rejoinRoom = async (
  roomCode: string,
  userId: number
): Promise<{ session: Session }> => {
  const response = await fetch(`${BASE_URL}/sessions/${roomCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }

  const { session }: SessionObject = data;
  const user = session?.users?.find((user) => user.id === userId);

  if (!user) {
    throw new Error("User does not exist");
  }

  if (
    session.gameEndedAt ||
    DateTime.fromISO(session.createdAt) < DateTime.now().minus({ hours: 1 })
  ) {
    throw new Error("Room has expired");
  }

  saveRoomData(roomCode, user.nickname, userId, user.isHost);
  return { session };
};

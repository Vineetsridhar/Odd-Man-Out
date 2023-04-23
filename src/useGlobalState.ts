import { create } from "zustand";
import { GameUsers, User } from "./types";

type GlobalState = {
  roomCode: string | null;
  nickname: string | null;
  userId: string | null;
  isHost: boolean;
  players: GameUsers | null;
  hostName: string | null;
};

export const updateUsers = (users: GameUsers) => {
  const players = Object.values(users);
  const host = players.find((user) => user.isHost);
  useGlobalState.setState({ players: users, hostName: host?.nickname });
};

export const updateRoomData = (
  roomCode: string,
  nickname: string,
  userId: string,
  isHost = false
) => {
  useGlobalState.setState({ roomCode, nickname, userId, isHost });
};

export const resetRoomData = () => {
  useGlobalState.setState({ roomCode: null, nickname: null, userId: null });
};

export const useGlobalState = create<GlobalState>(() => ({
  roomCode: null,
  nickname: null,
  userId: null,
  isHost: false,
  players: null,
  hostName: null,
}));

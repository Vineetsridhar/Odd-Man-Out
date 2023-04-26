import { create } from "zustand";
import { User } from "./types";

type GlobalState = {
  roomCode: string | null;
  nickname: string | null;
  userId: number | null;
  isHost: boolean;
  players: User[] | null;
  hostName: string | null;
};

export const updateRoomData = (
  roomCode: string,
  nickname: string,
  userId: number,
  isHost = false
) => {
  useGlobalState.setState({ roomCode, nickname, userId, isHost });
};

export const setRoomPlayers = (players: User[]) => {
  useGlobalState.setState({ players });
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

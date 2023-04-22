import { create } from "zustand";

type GlobalState = {
  roomCode: string | null;
  nickname: string | null;
  userId: string | null;
  isHost: boolean;
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
}));

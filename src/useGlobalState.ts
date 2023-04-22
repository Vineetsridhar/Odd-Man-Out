import { create } from "zustand";

type GlobalState = {
  roomCode: string | null;
  nickname: string | null;
  userId: string | null;
};

export const updateRoomData = (
  roomCode: string,
  nickname: string,
  userId: string
) => {
  useGlobalState.setState({ roomCode, nickname, userId });
};

export const resetRoomData = () => {
  useGlobalState.setState({ roomCode: null, nickname: null, userId: null });
};

export const useGlobalState = create<GlobalState>(() => ({
  roomCode: null,
  nickname: null,
  userId: null,
}));

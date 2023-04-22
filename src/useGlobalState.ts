import { create } from "zustand";

type GlobalState = {
  roomCode: string | null;
};

export const setRoomCode = (roomCode: string) => {
  useGlobalState.setState({ roomCode });
};

export const useGlobalState = create<GlobalState>(() => ({
  roomCode: null,
}));

export const BASE_URL = "http://localhost:3000";

export type ToggleOptions = "join" | "create";
export type GameType = "classic";

export type Room = {
  id: number;
  roomCode: string;
  gameEndedAt?: string;
  gameStartedAt?: string;
  gameType: GameType;
  createdAt: string;
  updatedAt: string;
  users?: User[];
};

export type User = {
  id: string;
  nickname: string;
  isHost: boolean;
  points: number;
  roomId: string;
  room?: Room;
  createdAt: string;
  updatedAt: string;
};

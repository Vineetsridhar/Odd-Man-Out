export const BASE_URL = "http://localhost:3000";

export type ToggleOptions = "join" | "create";
export type GameType = "classic";

export type Session = {
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
  id: number;
  nickname: string;
  isHost: boolean;
  points: number;
  sessionId: string;
  session?: Session;
  createdAt: string;
  updatedAt: string;
};

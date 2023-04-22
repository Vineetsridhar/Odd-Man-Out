export type ToggleOptions = "join" | "create";

export type User = {
  nickname: string;
  isHost: boolean;
};
export type GameUsers = {
  [key: string]: User;
};
export type DatabaseGameState = {
  createdAt: number;
  gameEnded?: boolean;

  users: GameUsers;
};

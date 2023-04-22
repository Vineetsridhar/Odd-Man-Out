export type ToggleOptions = "join" | "create";
export type GameType = "classic";
export type nil = null | undefined;

export type User = {
  nickname: string;
  isHost: boolean;
};
export type GameUsers = {
  [key: string]: User;
};
export type GameMetadata = {
  createdAt: number;
  gameEnded: nil;
  gameStartedAt: nil;
  gameType: GameType;
};
export type DatabaseGameState = {
  code: string;
  metadata: GameMetadata;
  users: GameUsers;
};

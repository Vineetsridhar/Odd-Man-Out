export type ToggleOptions = "join" | "create";
export type GameType = "classic";
export type nil = null | undefined;

export type User = {
  nickname: string;
  isHost: boolean;
  points: number;
};
export type Answer = {
  answer: string;
  userId: string;
};
export type GameAnswers = {
  [key: string]: Answer;
};
export type Round = {
  roundNumber: number;
  createdAt: number;
  endedAt: number | nil;
  oddManOut: string;
  normalQuestion: string;
  oddManOutQuestion: string;
  answers: GameAnswers;
};
export type GameRounds = {
  [key: string]: Round;
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
  rounds: GameRounds;
};

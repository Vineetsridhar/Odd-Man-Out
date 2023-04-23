export type ToggleOptions = "join" | "create";
export type GameType = "classic";
export type RoundStatus = "waiting" | "voting" | "results";
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
  status: RoundStatus;
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
  currentRound: number | nil;
};
export type DatabaseGameState = {
  code: string;
  metadata: GameMetadata;
  users: GameUsers;
  rounds: GameRounds;
};

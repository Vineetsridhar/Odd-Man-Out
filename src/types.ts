export type ToggleOptions = "join" | "create";

export type DatabaseGameState = {
  createdAt: number;
  gameEnded?: boolean;

  users: {
    [key: string]: string;
  };
};

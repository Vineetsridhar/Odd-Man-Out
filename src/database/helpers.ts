import { initializeApp } from "@firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
} from "@firebase/database";
import {
  updateRoomData,
  resetRoomData,
  useGlobalState,
} from "../useGlobalState";
import {
  DatabaseGameState,
  GameMetadata,
  GameUsers,
  Round,
  User,
} from "../types";
import { questions } from "../questionPairs";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
};

const sampleArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const clearRoomData = () => {
  localStorage.removeItem("roomCode");
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");

  resetRoomData();
};

const saveRoomData = (
  roomCode: string,
  nickname: string,
  userId: string | null,
  isHost: boolean
) => {
  localStorage.setItem("roomCode", roomCode);
  localStorage.setItem("nickname", nickname);
  if (userId) localStorage.setItem("userId", userId);

  updateRoomData(roomCode, nickname, userId ?? "", isHost);
};

const getDatabaseValue = async (path: string) => {
  const dbRef = ref(db, path);
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const kickPlayer = async (roomCode: string, userId: string) => {
  const path = `${roomCode}/users/${userId}`;
  await set(ref(db, path), null);
};

export const createNewRoom = async (nickname: string) => {
  const roomCode = generateRandomString();
  const dbRef = ref(db, roomCode);

  const newGame: DatabaseGameState = {
    code: roomCode,
    users: {},
    metadata: {
      gameType: "classic",
      createdAt: Date.now(),
      gameEnded: null,
      gameStartedAt: null,
      currentRound: null,
    },
    rounds: {},
  };

  await set(dbRef, newGame);

  const newUser: User = {
    nickname,
    isHost: true,
    points: 0,
  };
  const userId = push(child(dbRef, "users"), newUser).key;
  saveRoomData(roomCode, nickname, userId, true);
};

export const startGame = async (roomCode: string) => {
  const metadataRef = ref(db, `${roomCode}/metadata`);
  const roundRef = ref(db, `${roomCode}/rounds`);
  const questionPair = sampleArray(questions);
  const oddManOut = sampleArray(
    Object.keys(useGlobalState.getState().players!)
  );
  const newRound: Round = {
    roundNumber: 1,
    createdAt: Date.now(),
    oddManOut: oddManOut,
    answers: {},
    status: "waiting",
    endedAt: null,
    normalQuestion: questionPair[0],
    oddManOutQuestion: questionPair[1],
  };
  update(metadataRef, {
    gameStartedAt: Date.now(),
    currentRound: 1,
  });
  update(roundRef, { round1: newRound });
};

export const joinRoom = async (roomCode: string, nickname: string) => {
  const users: GameUsers = await getDatabaseValue(`${roomCode}/users`);
  const metadata: GameMetadata = await getDatabaseValue(`${roomCode}/metadata`);

  if (!metadata) {
    throw new Error("Room does not exist");
  }

  if (Object.values(users).find((user) => user.nickname === nickname)) {
    throw new Error("Nickname already taken");
  }

  if (metadata.gameEnded || metadata.createdAt < Date.now() - 60 * 60 * 1000) {
    throw new Error("Room has expired");
  }

  const newUser: User = {
    nickname,
    isHost: false,
    points: 0,
  };

  const userId = push(child(ref(db, roomCode), "users"), newUser).key;
  saveRoomData(roomCode, nickname, userId, false);
};

export const rejoinRoom = async (roomCode: string, userId: string) => {
  const users: GameUsers = await getDatabaseValue(`${roomCode}/users`);
  const metadata: GameMetadata = await getDatabaseValue(`${roomCode}/metadata`);

  if (!metadata) {
    throw new Error("Room does not exist");
  }

  const user = users[userId];
  if (!user) {
    throw new Error("User does not exist");
  }

  if (metadata.gameEnded || metadata.createdAt < Date.now() - 60 * 60 * 1000) {
    throw new Error("Room has expired");
  }

  saveRoomData(roomCode, user.nickname, userId, user.isHost);
};

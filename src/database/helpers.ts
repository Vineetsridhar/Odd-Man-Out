import { initializeApp } from "@firebase/app";
import { getDatabase, ref, set, get, child, push } from "@firebase/database";
import { updateRoomData, resetRoomData } from "../useGlobalState";
import { DatabaseGameState } from "../types";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
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
  userId: string | null
) => {
  localStorage.setItem("roomCode", roomCode);
  localStorage.setItem("nickname", nickname);
  if (userId) localStorage.setItem("userId", userId);

  updateRoomData(roomCode, nickname, userId ?? "");
};

const getDatabaseValue = async (path: string) => {
  const dbRef = ref(db, path);
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const createNewRoom = async (nickname: string) => {
  const roomCode = generateRandomString();
  const dbRef = ref(db, `rooms/${roomCode}`);

  await set(dbRef, {
    name: roomCode,
    users: [],
    createdAt: Date.now(),
    gameEnded: false,
  });
  const userId = push(child(dbRef, "users"), nickname).key;
  saveRoomData(roomCode, nickname, userId);
};

export const joinRoom = async (roomCode: string, nickname: string) => {
  const path = `rooms/${roomCode}`;
  const gameData: DatabaseGameState = await getDatabaseValue(path);

  if (!gameData) {
    throw new Error("Room does not exist");
  }

  const users = gameData.users;
  if (Object.values(users).includes(nickname)) {
    throw new Error("Nickname already taken");
  }

  if (gameData.gameEnded || gameData.createdAt < Date.now() - 60 * 60 * 1000) {
    throw new Error("Room has expired");
  }

  const userId = push(child(ref(db, path), "users"), nickname).key;
  saveRoomData(roomCode, nickname, userId);
};

export const rejoinRoom = async (roomCode: string, userId: string) => {
  const path = `rooms/${roomCode}`;
  const gameData: DatabaseGameState = await getDatabaseValue(path);

  if (!gameData) {
    throw new Error("Room does not exist");
  }

  const users = gameData.users;

  const nickname = users[userId];
  if (!nickname) {
    throw new Error("User does not exist");
  }

  if (gameData.gameEnded || gameData.createdAt < Date.now() - 60 * 60 * 1000) {
    throw new Error("Room has expired");
  }

  saveRoomData(roomCode, nickname, userId);
};

import { initializeApp } from "@firebase/app";
import { getDatabase, ref, set, get, child, push } from "@firebase/database";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
};

const saveRoomDataToLocalStorage = (
  roomKey: string,
  nickname: string,
  key: string | null
) => {
  localStorage.setItem("roomKey", roomKey);
  localStorage.setItem("nickname", nickname);
  if (key) localStorage.setItem("key", key);
};

export const createNewRoom = async (nickname: string) => {
  const roomKey = generateRandomString();
  const dbRef = ref(db, `rooms/${roomKey}`);

  await set(dbRef, {
    name: roomKey,
    users: [],
  });
  const key = push(child(dbRef, "users"), nickname).key;
  saveRoomDataToLocalStorage(roomKey, nickname, key);
};

export const joinRoom = async (roomKey: string, nickname: string) => {
  const dbRef = ref(db, `rooms/${roomKey}`);
  const gameData = await get(dbRef);
  const users = gameData.val().users;
  if (Object.values(users).includes(nickname)) {
    throw new Error("Nickname already taken");
  }

  const key = push(child(dbRef, "users"), nickname).key;
  saveRoomDataToLocalStorage(roomKey, nickname, key);
};

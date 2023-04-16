import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

type TOrObject<T> = T extends object ? T : object;

export function useFirebaseDatabase<T>(
  path: string,
  defaultValue: T
): [T, (data: TOrObject<T>) => void, (data: T) => void];

export function useFirebaseDatabase<T = undefined>(
  path: string,
  defaultValue?: T
): [T | undefined, (data: TOrObject<T>) => void, (data: T) => void];

export function useFirebaseDatabase<T>(path: string, defaultValue: T) {
  const dbRef = useMemo(() => ref(db, path), [path]);

  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val() ?? defaultValue);
    });
    return unsubscribe;
  }, [dbRef]);

  const addFirebaseData = useCallback(
    (data: TOrObject<T>) => {
      update(dbRef, data);
    },
    [dbRef]
  );

  const setFirebaseData = useCallback(
    (data: T) => {
      set(dbRef, data);
    },
    [dbRef]
  );

  return [data, addFirebaseData, setFirebaseData] as const;
}

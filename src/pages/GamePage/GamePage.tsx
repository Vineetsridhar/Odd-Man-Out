import { LeaveGameButton } from "../../components/LeaveGameButton";
import { useFirebaseDatabase } from "../../hooks/useFirebaseDatabase";
import { useGlobalState } from "../../useGlobalState";

export const GamePage = () => {
  const roomCode = useGlobalState((state) => state.roomCode);
  const [currentRoundNumber] = useFirebaseDatabase(
    `${roomCode}/metadata/currentRound`
  );
  const [round] = useFirebaseDatabase(
    `${roomCode}/rounds/round${currentRoundNumber}`
  );

  return (
    <div style={{ color: "white", height: "100%", width: "100%" }}>
      <LeaveGameButton />
      {JSON.stringify(round)}
    </div>
  );
};

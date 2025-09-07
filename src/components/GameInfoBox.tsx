interface GameInfoBoxProps {
  gameId: string;
  time: string;
  place: string;
}

function GameInfoBox({ gameId, time, place }: GameInfoBoxProps) {
  return (
    <div className="flex flex-col pt-6 pb-5 pl-5 border-b-8 border-bg-300">
      <div className="text-xl font-light">#{gameId}</div>
      <div className="mt-2 font-semibold text-xl">{time}</div>
      <div className="mt-1">{place}</div>
    </div>
  );
}

export default GameInfoBox;

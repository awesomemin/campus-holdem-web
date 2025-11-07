interface GameInfoBoxProps {
  gameId: string;
  time: string;
  place: string;
  loading?: boolean;
}

function GameInfoBox({ gameId, time, place, loading }: GameInfoBoxProps) {
  if (loading)
    return (
      <div className="flex flex-col pt-6 pb-5 pl-5 border-b-8 border-bg-300 animate-pulse">
        <div className="text-xl font-light bg-bg-300 text-bg-300 w-10">.</div>
        <div className="mt-2 mr-5 font-semibold text-xl bg-bg-300 text-bg-300">
          .
        </div>
        <div className="mt-1 mr-5 bg-bg-300 text-bg-300">.</div>
      </div>
    );
  return (
    <div className="flex flex-col pt-6 pb-5 pl-5 border-b-8 border-bg-300">
      <div className="text-xl font-light">#{gameId}</div>
      <div className="mt-2 font-semibold text-xl">{time}</div>
      <div className="mt-1">{place}</div>
    </div>
  );
}

export default GameInfoBox;

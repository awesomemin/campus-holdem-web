import PeopleAlt from '@mui/icons-material/PeopleAlt';

interface GameListItemProps {
  time: string;
  place: string;
  gameId: number;
  maxParticipant: number;
  curParticipant: number;
}

function GameListItem({
  time,
  place,
  gameId,
  maxParticipant,
  curParticipant,
}: GameListItemProps) {
  return (
    <div className="flex flex-col bg-bg-300 pl-5 pr-6 pt-3 pb-4 border-b border-b-bg-400">
      <div className="font-semibold text-xl">{time}</div>
      <div className="mt-2">{place}</div>
      <div className="flex items-end justify-between mt-6">
        <div>#{gameId}</div>
        <div className="font-semibold text-xl">
          {curParticipant} / {maxParticipant}
          <PeopleAlt className="ml-1" />
        </div>
      </div>
    </div>
  );
}

export default GameListItem;

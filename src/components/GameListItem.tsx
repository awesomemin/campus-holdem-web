import PeopleAlt from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router';

interface GameListItemProps {
  time: string;
  place: string;
  gameId: number;
  maxParticipant: number;
  curParticipant: number;
  status: 'PLANNED' | 'PROGRESS' | 'COMPLETED' | 'CANCELED';
}

function GameListItem({
  time,
  place,
  gameId,
  maxParticipant,
  curParticipant,
  status,
}: GameListItemProps) {
  console.log(status);
  return (
    <Link
      to={`/game/${gameId}`}
      className="flex flex-col bg-bg-300 pl-5 pr-6 pt-3 pb-4 border-b border-b-bg-400"
    >
      <div className="font-semibold text-xl">{time}</div>
      <div className="mt-2">{place}</div>
      <div className="flex items-end justify-between mt-6">
        <div>#{gameId}</div>
        <div className="font-semibold text-xl">
          {curParticipant} / {maxParticipant}
          <PeopleAlt className="ml-1" />
        </div>
      </div>
    </Link>
  );
}

export default GameListItem;

import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router';
import StatusBadge from './ParticipantStatusBadge';

interface GameListItemProps {
  time: string;
  place: string;
  gameId: number;
  maxParticipant: number;
  curParticipant: number;
  status: 'PLANNED' | 'PROGRESS' | 'COMPLETED' | 'CANCELED';
  winner?: {
    nickname: string;
    profilePictureUrl: string | null;
  };
}

function GameListItem({
  time,
  place,
  gameId,
  maxParticipant,
  curParticipant,
  status,
  winner,
}: GameListItemProps) {
  console.log(status);
  return (
    <Link
      to={`/game/${gameId}`}
      className={`relative flex flex-col bg-bg-300 pl-5 pr-6 pt-3 pb-4 border-b border-b-bg-400 ${
        status === 'CANCELED' || status === 'COMPLETED' ? 'text-text-gray' : ''
      }`}
    >
      <div className="font-semibold text-xl">{time}</div>
      <div className="w-60 mt-2 leading-tight">{place}</div>
      <div className="flex items-end justify-between mt-6">
        <div className="flex items-center gap-2">
          <div>#{gameId}</div>
          {status === 'COMPLETED' && (
            <StatusBadge status="CONFIRMED" content="경기 종료" />
          )}
          {status === 'CANCELED' && (
            <StatusBadge status="SUSPENDED" content="경기 취소" />
          )}
        </div>
        {status !== 'COMPLETED' && (
          <div className="font-semibold text-xl">
            {curParticipant} / {maxParticipant}
            <PeopleAlt className="ml-1" />
          </div>
        )}
      </div>
      {status === 'COMPLETED' && (
        <div className="absolute top-1/2 -translate-y-1/2 right-3 flex flex-col gap-1 items-center">
          <span className="text-xs font-light text-text-white">우승자</span>
          <img
            className="w-9 rounded-full bg-text-white"
            src={winner?.profilePictureUrl || DefaultProfileImgUrl}
          />
          <span className="w-14 font-semibold text-center text-xs text-text-white leading-tight break-words">
            {winner?.nickname}
          </span>
        </div>
      )}
    </Link>
  );
}

export default GameListItem;

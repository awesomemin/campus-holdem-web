import { Link } from 'react-router';
import { formatDateTime } from '../utils/datetime';
import ParticipantStatusBadge from './ParticipantStatusBadge';

interface ApplyListItemProps {
  id: number;
  status: 'CONFIRMED' | 'SUSPENDED';
  time: string;
  place: string;
  onClickBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ApplyListItem({
  id,
  status,
  time,
  place,
  onClickBtn,
}: ApplyListItemProps) {
  return (
    <Link
      to={`/game/${id}`}
      className="relative flex flex-col px-3 py-3 bg-bg-300 rounded-lg"
    >
      <div className="flex gap-1.5">
        <span className="font-light text-sm">#{id}</span>
        <ParticipantStatusBadge status={status} />
      </div>
      <div className="font-medium text-lg">{formatDateTime(time)}</div>
      <div className="text-sm">{place}</div>
      <button
        onClick={onClickBtn}
        className="absolute top-3 right-3 rounded bg-bg-400 px-1.5 py-1 font-medium text-sm cursor-pointer"
      >
        참가 취소
      </button>
    </Link>
  );
}

export default ApplyListItem;

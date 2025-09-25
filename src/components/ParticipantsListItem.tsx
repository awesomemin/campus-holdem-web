import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import { formatNumber } from '../utils/datetime';
import StatusBadge from './ParticipantStatusBadge';

interface Participant {
  userId: number;
  status: 'CONFIRMED' | 'SUSPENDED';
  rank: number | null;
  ppiChange: number | null;
  User: {
    id: number;
    nickname: string;
    profilePictureUrl: string | null;
    ppi: number;
  };
}

interface ParticipantsListItemProps {
  participant: Participant;
}

function ParticipantsListItem({ participant }: ParticipantsListItemProps) {
  if (!participant) {
    return (
      <div className="flex items-center justify-center h-11 border-b border-bg-300 text-text-gray">
        BLANK
      </div>
    );
  }
  return (
    <div className="flex items-center h-11 pl-3 border-b border-bg-300">
      <img
        className="bg-text-white w-7 rounded-full mr-2"
        src={participant.User.profilePictureUrl || DefaultProfileImgUrl}
      />
      <span className="mr-1">{participant.User.nickname}</span>
      <StatusBadge
        status={participant.status}
        content={participant.status === 'CONFIRMED' ? '확정' : '대기'}
      />

      <span className="ml-auto mr-3">
        {formatNumber(participant.User.ppi)} PPI
      </span>
    </div>
  );
}

export default ParticipantsListItem;

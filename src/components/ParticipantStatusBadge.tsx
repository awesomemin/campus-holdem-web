interface ParticipantStatusBadgeProps {
  status: 'CONFIRMED' | 'SUSPENDED';
}

function ParticipantStatusBadge({ status }: ParticipantStatusBadgeProps) {
  if (status == 'CONFIRMED')
    return (
      <span className="text-xs bg-primary-green text-text-black rounded-md px-1 py-0.5">
        확정
      </span>
    );
  else
    return (
      <span className="text-xs bg-bg-300 px-1 py-0.5 rounded-md">대기</span>
    );
}

export default ParticipantStatusBadge;

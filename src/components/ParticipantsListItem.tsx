interface Participant {
  profileImgUrl: string;
  name: string;
  ppi: number;
  isConfirmed: boolean;
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
        className="w-7 h-7 rounded-full mr-2"
        src={participant.profileImgUrl}
      />
      <span className="mr-1">{participant.name}</span>
      {participant.isConfirmed ? (
        <span className="text-xs bg-primary-green text-text-black rounded-md px-1 py-0.5">
          확정
        </span>
      ) : (
        <span className="text-xs bg-bg-300 px-1 py-0.5 rounded-md">대기</span>
      )}
      {/* <span className="ml-auto mr-3">{participant.ppi} PPI</span> */}
    </div>
  );
}

export default ParticipantsListItem;

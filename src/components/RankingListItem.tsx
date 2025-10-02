import { useNavigate } from 'react-router';
import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import { formatNumber } from '../utils/datetime';

interface RankingListItemProps {
  ranking: number;
  profileImgUrl: string | null;
  nickname: string;
  ppi: number;
  userId: number;
  isOwner?: boolean;
}

function RankingListItem({
  ranking,
  profileImgUrl,
  nickname,
  ppi,
  userId,
  isOwner = false,
}: RankingListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div
      className={`h-[60px] flex px-5 items-center border-y border-bg-300 cursor-pointer hover:bg-bg-200 transition-colors ${
        isOwner ? 'text-primary-green' : ''
      }`}
      onClick={handleClick}
    >
      <span className="font-semibold text-lg">{ranking}.</span>
      <img
        className="bg-text-white w-9 h-9 rounded-full object-cover ml-3"
        src={profileImgUrl || DefaultProfileImgUrl}
        alt="profile picture"
      />
      <span className="ml-2">{nickname}</span>
      <span className="ml-auto">{formatNumber(ppi)} PPI</span>
    </div>
  );
}

export default RankingListItem;

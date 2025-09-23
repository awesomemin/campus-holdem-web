import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import Edit from '@mui/icons-material/Edit';
import { formatNumber } from '../utils/datetime';

interface UserInfoBoxProps {
  nickname: string;
  userId: string;
  email: string | null;
  profilePictureUrl: string | null;
  ppi: number;
  ticketBalance: number;
}

function UserInfoBox({
  nickname,
  userId,
  email,
  profilePictureUrl,
  ppi,
  ticketBalance,
}: UserInfoBoxProps) {
  return (
    <div className="flex flex-col">
      <div className="flex h-30 items-center">
        <div>
          <img
            src={profilePictureUrl || DefaultProfileImgUrl}
            className="bg-text-white w-15 h-15 rounded-full ml-6"
          />
        </div>
        <div className="flex flex-col ml-4 gap-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">{nickname}</span>
            <span className="font-light text-sm text-text-gray">
              [{userId}]
            </span>
          </div>
          <div className="font-light text-sm">{email}</div>
        </div>
        {email && (
          <div
            className="text-text-gray ml-auto mr-6"
            onClick={() => {
              alert('아직 지원하지 않는 기능입니다.');
            }}
          >
            <Edit />
          </div>
        )}
      </div>
      <div className="mx-6 flex gap-3 mb-4">
        <div className="h-[60px] bg-bg-300 flex-1 rounded-md relative">
          <span className="font-light absolute top-1.5 left-2.5">PPI</span>
          <span className="font-medium text-xl absolute bottom-2 right-3">
            {formatNumber(ppi)}
          </span>
        </div>
        <div className="h-[60px] bg-bg-300 flex-1 rounded-md relative">
          <span className="font-light absolute top-1.5 left-2.5">
            무료 참가권
          </span>
          <span className="font-medium text-xl absolute bottom-2 right-3">
            {formatNumber(ticketBalance)}장
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserInfoBox;

import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import Edit from '@mui/icons-material/Edit';

interface UserInfoBoxProps {
  nickname: string;
  userId: string;
  email: string | null;
  profilePictureUrl: string | null;
}

function UserInfoBox({
  nickname,
  userId,
  email,
  profilePictureUrl,
}: UserInfoBoxProps) {
  return (
    <div className="flex h-30 items-center">
      <div>
        <img
          src={profilePictureUrl || DefaultProfileImgUrl}
          className="bg-text-white w-15 h-15 rounded-full ml-[30px]"
        />
      </div>
      <div className="flex flex-col ml-4 gap-1">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-xl">{nickname}</span>
          <span className="font-light text-sm text-text-gray">[{userId}]</span>
        </div>
        <div className="font-light text-sm">{email}</div>
      </div>
      {email && <Edit className="text-text-gray ml-auto mr-[30px]" />}
    </div>
  );
}

export default UserInfoBox;

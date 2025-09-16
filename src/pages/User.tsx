import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserInfoBox from '../components/UserInfoBox';

interface PublicUserDto {
  id: string;
  nickname: string;
  profilePictureUrl: string | null;
  ppi: number;
  created_at: Date;
}

interface PrivateUserDto {
  id: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  ppi: number;
  created_at: Date;
}

type User = PublicUserDto | PrivateUserDto | null;

function User() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserInfo(userId: string) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1];

      const response = await fetch(`${apiUrl}/users/${userId}`, {
        headers: {
          Authorization: accessToken || '',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || '유저 정보 불러오기에 실패했습니다.'
        );
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      setUserInfo(data);
      setIsLoading(false);
    }
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  if (isLoading || !userInfo) return <div>loading...</div>;

  return (
    <>
      <Header />
      <UserInfoBox
        nickname={userInfo.nickname}
        userId={userInfo.id}
        email={'email' in userInfo ? userInfo.email : null}
        profilePictureUrl={userInfo.profilePictureUrl}
      />
    </>
  );
}

export default User;

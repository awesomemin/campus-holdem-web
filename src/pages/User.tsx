import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserInfoBox from '../components/UserInfoBox';
import PrivateUserMenuList from '../components/PrivateUserMenuList';
import EditProfileModal from '../components/EditProfileModal';
import { authenticatedFetch } from '../utils/api';

interface PublicUserDto {
  id: string;
  nickname: string;
  profilePictureUrl: string | null;
  ppi: number;
  ticketBalance: number;
  created_at: Date;
}

interface PrivateUserDto {
  id: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  ppi: number;
  ticketBalance: number;
  created_at: Date;
}

type User = PublicUserDto | PrivateUserDto | null;

function User() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserInfo(userId: string) {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await authenticatedFetch(`${apiUrl}/users/${userId}`);
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

  const handleDeleteProfilePicture = async () => {
    if (!userId) return;

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await authenticatedFetch(
        `${apiUrl}/users/profile-picture`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || '프로필 사진 삭제에 실패했습니다.'
        );
      }

      // Re-fetch user info to update the UI
      const fetchResponse = await authenticatedFetch(
        `${apiUrl}/users/${userId}`
      );

      if (fetchResponse.ok) {
        const updatedUserData = await fetchResponse.json();
        setUserInfo(updatedUserData);
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '프로필 사진 삭제에 실패했습니다.'
      );
    }
  };

  const handleUpdateUser = async (formData: FormData) => {
    if (!userInfo || !userId) return;

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      // Send the FormData with multipart/form-data
      // Do not set Content-Type header - browser will set it automatically with boundary
      const response = await authenticatedFetch(`${apiUrl}/users/`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '프로필 업데이트에 실패했습니다.');
      }

      // After successful update, re-fetch the user data to ensure consistency
      setIsModalOpen(false);
      alert('프로필이 성공적으로 업데이트되었습니다.');

      // Re-fetch user info to get the complete updated data
      const fetchResponse = await authenticatedFetch(
        `${apiUrl}/users/${userId}`
      );

      if (fetchResponse.ok) {
        const updatedUserData = await fetchResponse.json();
        setUserInfo(updatedUserData);
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '프로필 업데이트에 실패했습니다.'
      );
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  if (!userInfo) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <div>사용자 정보를 찾을 수 없습니다.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <UserInfoBox
        nickname={userInfo.nickname}
        userId={userInfo.id}
        email={'email' in userInfo ? userInfo.email : null}
        profilePictureUrl={userInfo.profilePictureUrl}
        ppi={userInfo.ppi}
        ticketBalance={userInfo.ticketBalance}
        onEditClick={() => setIsModalOpen(true)}
      />
      {'email' in userInfo && <PrivateUserMenuList />}
      {'email' in userInfo && (
        <EditProfileModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateUser}
          onDeleteProfilePicture={handleDeleteProfilePicture}
          currentData={{
            nickname: userInfo.nickname,
            email: userInfo.email,
            phoneNumber:
              'phoneNumber' in userInfo ? userInfo.phoneNumber : null,
            profilePictureUrl: userInfo.profilePictureUrl,
          }}
        />
      )}
    </>
  );
}

export default User;

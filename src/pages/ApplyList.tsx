import { useParams, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ApplyListItem from '../components/ApplyListItem';

interface ApplyListGame {
  id: number;
  time: string;
  place: string;
  status: string;
  participants: Array<{
    status: 'CONFIRMED' | 'SUSPENDED';
  }>;
}

function ApplyList() {
  const { userId } = useParams<{ userId: string }>();
  const { user, isLoading } = useAuth();
  const [games, setGames] = useState<ApplyListGame[]>([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch apply list data
  useEffect(() => {
    const fetchApplyList = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/users/${userId}/applylist`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || '신청내역을 불러오는데 실패했습니다.'
          );
        }

        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
        );
      } finally {
        setIsLoadingGames(false);
      }
    };

    if (userId && user && user.userId === parseInt(userId)) {
      fetchApplyList();
    }
  }, [userId, user]);

  // Show loading while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is accessing their own apply list
  if (user.userId !== parseInt(userId || '0')) {
    return <Navigate to="/" replace />;
  }

  // Show loading while fetching games
  if (isLoadingGames) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
          신청내역
        </div>
        <div className="flex justify-center items-center h-32">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  // Show error if there's an error
  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
          신청내역
        </div>
        <div className="flex justify-center items-center h-32 text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        신청내역
      </div>
      <div className="mx-6 space-y-3">
        {games.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            신청한 경기가 없습니다.
          </div>
        ) : (
          games.map((game) => (
            <ApplyListItem
              key={game.id}
              id={game.id}
              status={game.participants[0]?.status || 'CONFIRMED'}
              time={game.time}
              place={game.place}
              onClickBtn={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert(
                  '곧 지원할 기능입니다. 참가 취소는 오픈채팅방을 통해 문의해주세요.'
                );
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ApplyList;

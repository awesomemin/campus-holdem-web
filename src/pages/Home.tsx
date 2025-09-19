import { useEffect, useState } from 'react';
import GameListItem from '../components/GameListItem';
import Header from '../components/Header';
import { fetchAllGames } from '../api/game';
import { formatDateTime } from '../utils/datetime';

interface GameListResponse {
  id: number;
  time: string;
  place: string;
  particifationFee: number;
  rebuyinFee: number;
  startingChip: number;
  startingBB: number;
  estimatedDurationInMinutes: number;
  maxParticipant: number;
  minParticipant: number;
  _count: {
    participants: number;
  };
}

function Home() {
  const [gameList, setGameList] = useState<GameListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllGames();
        setGameList(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '게임을 불러오는 중 오류가 발생했습니다.'
        );
        setGameList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
          게임 목록
        </div>
        <div className="flex justify-center items-center h-32">로딩 중...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
          게임 목록
        </div>
        <div className="flex justify-center items-center h-32 text-red-600">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        게임 목록
      </div>
      {gameList.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          게임이 없습니다.
        </div>
      ) : (
        gameList.map((game) => (
          <GameListItem
            key={game.id}
            time={formatDateTime(game.time)}
            place={game.place}
            gameId={game.id}
            maxParticipant={game.maxParticipant}
            curParticipant={game._count.participants}
          />
        ))
      )}
    </>
  );
}

export default Home;

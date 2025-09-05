import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface Game {
  gameId: number;
  time: string;
  place: string;
  particifationFee: number;
  rebuyinFee: number;
  startingChip: number;
  startingBB: number;
  estimatedDurationInMinutes: number;
}

const fetchGameById = async (id: string): Promise<Game> => {
  console.log(id);
  const gameData = {
    gameId: 2,
    time: '2025. 8. 23(토) 17:00',
    place: '성균관대학교 산학협력관 85529',
    particifationFee: 5000,
    rebuyinFee: 5000,
    startingChip: 20000,
    startingBB: 200,
    estimatedDurationInMinutes: 180,
  };
  return new Promise((resolve) => setTimeout(() => resolve(gameData), 500));
};

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);

  useEffect(() => {
    const loadGameData = async () => {
      if (!gameId) return;
      const data = await fetchGameById(gameId);
      setGameInfo(data);
    };
    loadGameData();
  }, [gameId]);

  return (
    <>
      <div>{gameInfo?.estimatedDurationInMinutes}</div>
    </>
  );
}

export default GameDetail;

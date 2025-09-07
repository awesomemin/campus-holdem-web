import { useLocation, useParams } from 'react-router';
import Header from '../components/Header';
import GameInfoBox from '../components/GameInfoBox';
import { useEffect, useState } from 'react';
import type { Game } from '../types/game';
import { fetchGameById } from '../api/game';

function GameApply() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state?.gameInfo) {
      setGameInfo(location.state.gameInfo);
      setLoading(false);
      return;
    }
    const loadGameData = async () => {
      if (!gameId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await fetchGameById(gameId);
      setGameInfo(data);
      setLoading(false);
    };
    loadGameData();
  }, []);

  if (!gameId) return <div>not found</div>;
  if (loading || !gameInfo) return <div>loading...</div>;
  return (
    <>
      <Header />
      <GameInfoBox
        gameId={gameId}
        time={gameInfo.time}
        place={gameInfo.place}
      />
    </>
  );
}

export default GameApply;

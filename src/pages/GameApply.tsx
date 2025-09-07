import { useLocation, useParams } from 'react-router';
import Header from '../components/Header';
import GameInfoBox from '../components/GameInfoBox';
import { useEffect, useState } from 'react';
import type { Game } from '../types/game';
import { fetchGameById } from '../api/game';
import BigButton from '../components/BigButton';

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
      <div className="flex flex-col items-center h-full">
        <div className="font-semibold text-xl mt-12">
          {gameInfo.particifationFee}원을 아래 계좌로 입금해주세요.
        </div>
        <div className="mt-6">110-471-692503 신한은행 (오성민)</div>
        <div className="font-medium mt-10">
          입금 뒤 24시간 내로 참가 신청이 확정됩니다.
        </div>
        <div className="fixed left-0 right-0 bottom-0 flex justify-center">
          <div className="w-full max-w-md mb-15 px-10">
            <BigButton content="입금 완료 및 참가 신청" />
          </div>
        </div>
      </div>
    </>
  );
}

export default GameApply;

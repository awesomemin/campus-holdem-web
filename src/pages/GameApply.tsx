import { useLocation, useParams, useNavigate } from 'react-router';
import Header from '../components/Header';
import GameInfoBox from '../components/GameInfoBox';
import { useEffect, useState } from 'react';
import type { Game, Participant } from '../types/game';
import { fetchGameById } from '../api/game';
import BigButton from '../components/BigButton';
import { useAuth } from '../contexts/AuthContext';

function GameApply() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    const checkRegistrationAndLoadData = async () => {
      let gameData = location.state?.gameInfo;

      if (!gameData) {
        if (!gameId) {
          setLoading(false);
          return;
        }
        setLoading(true);
        gameData = await fetchGameById(gameId);
      }

      const isAlreadyRegistered = gameData?.participants.some(
        (participant: Participant) => participant.User.id === user.userId
      );

      if (isAlreadyRegistered) {
        alert('이미 이 게임에 신청하셨습니다.');
        navigate(`/game/${gameId}`);
        return;
      }

      setGameInfo(gameData);
      setLoading(false);
    };

    checkRegistrationAndLoadData();
  }, [authLoading, user, navigate, location.state?.gameInfo, gameId]);

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
        <div className="w-full px-10 mt-10">
          <BigButton content="입금 완료 및 참가 신청" />
        </div>
      </div>
    </>
  );
}

export default GameApply;

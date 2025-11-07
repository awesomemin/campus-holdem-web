import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import GameInfoBox from '../components/GameInfoBox';
import Header from '../components/Header';
import ParticipantsListItem from '../components/ParticipantsListItem';
import type { Game, Participant } from '../types/game';
import { fetchGameById } from '../api/game';
import { useAuth } from '../contexts/AuthContext';
import { formatDateTime } from '../utils/datetime';
import GameBasicInfo from '../components/GameBasicInfo';
import GameDetailBottomBar from '../components/GameDetailBottomBar';

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
  }, [gameId]);

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const isAlreadyRegistered = gameInfo?.participants.some(
      (participant: Participant) => participant.User.id === user.userId
    );

    if (isAlreadyRegistered) {
      alert('이미 이 게임에 신청하셨습니다.');
      return;
    }

    navigate(`/game/${gameId}/apply`, { state: { gameInfo: gameInfo } });
  };

  if (!gameId) return <div>not found</div>;
  if (loading || !gameInfo)
    return (
      <>
        <Header />
        <GameInfoBox gameId="..." time="..." place="..." loading />
        <GameBasicInfo gameInfo={null} loading />
        <GameDetailBottomBar gameInfo={null} handleApplyClick={null} loading />
      </>
    );

  const emptySlotsCount =
    gameInfo.maxParticipant - gameInfo.participants.length;
  const emptySlots = Array(Math.max(0, emptySlotsCount)).fill(null);
  const displayList = [...gameInfo.participants, ...emptySlots];
  console.log(gameInfo);

  return (
    <>
      <Header />
      <GameInfoBox
        gameId={gameId}
        time={formatDateTime(gameInfo.time)}
        place={gameInfo.place}
      />

      <GameBasicInfo gameInfo={gameInfo} />
      {/* 참가자 */}
      {gameInfo.status !== 'COMPLETED' && (
        <div className="pl-5 pt-5 pb-20">
          <div>
            <span className="font-medium text-xl mr-1">참가자</span>
            <span className="font-light">
              ({gameInfo.participants.length}/{gameInfo.maxParticipant})
            </span>
          </div>
          <div className="flex flex-col mr-5 mt-3">
            {displayList.map((participant, i) => (
              <ParticipantsListItem
                key={participant?.User.nickname ?? 'blank' + i}
                participant={participant}
              />
            ))}
          </div>
        </div>
      )}
      {/* 참가자 끝 */}
      {/* 경기 결과 */}
      {gameInfo.status === 'COMPLETED' && (
        <div className="pl-5 pt-5 pb-20">
          <div>
            <span className="font-medium text-xl mr-1">경기 결과</span>
          </div>
          <div className="flex flex-col mr-5 mt-3">
            {gameInfo.participants.map((participant, i) => (
              <ParticipantsListItem
                key={participant?.User.nickname ?? 'blank' + i}
                participant={participant}
              />
            ))}
          </div>
        </div>
      )}
      {/* 경기 결과 끝 */}
      {/* 하단바 */}
      <GameDetailBottomBar
        gameInfo={gameInfo}
        handleApplyClick={handleApplyClick}
      />
      {/* 하단바 끝 */}
    </>
  );
}

export default GameDetail;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import GameInfoBox from '../components/GameInfoBox';
import Header from '../components/Header';
import ParticipantsListItem from '../components/ParticipantsListItem';
import type { Game, Participant } from '../types/game';
import { fetchGameById } from '../api/game';
import { useAuth } from '../contexts/AuthContext';
import { formatDateTime } from '../utils/datetime';

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
  if (loading || !gameInfo) return <div>loading...</div>;

  const emptySlotsCount =
    gameInfo.maxParticipant - gameInfo.participants.length;
  const emptySlots = Array(Math.max(0, emptySlotsCount)).fill(null);
  const displayList = [...gameInfo.participants, ...emptySlots];

  return (
    <>
      <Header />
      <GameInfoBox
        gameId={gameId}
        time={formatDateTime(gameInfo.time)}
        place={gameInfo.place}
      />

      {/* 기본정보 */}
      <div className="py-5 pl-5 border-b-8 border-bg-300">
        <div className="font-medium text-xl">기본정보</div>
        <div className="grid grid-cols-[72px_1fr] gap-x-5 gap-y-2 mt-3 ml-1">
          <div className="flex justify-between font-semibold">
            <span>참</span>
            <span>가</span>
            <span>비</span>
          </div>
          <span>{gameInfo.particifationFee}원</span>

          <div className="flex justify-between font-semibold">
            <span>리</span>
            <span>바</span>
            <span>인</span>
            <span>비</span>
          </div>
          <span>{gameInfo.rebuyinFee}원</span>

          <div className="flex justify-between font-semibold">
            <span>스</span>
            <span>타</span>
            <span>팅</span>
            <span>칩</span>
          </div>
          <span>
            {gameInfo.startingChip} ({gameInfo.startingBB}BB)
          </span>

          <div className="flex justify-between font-semibold">
            <span>예</span>
            <span>상</span>
            <span>시</span>
            <span>간</span>
          </div>
          <span>{gameInfo.estimatedDurationInMinutes}분</span>
        </div>
      </div>

      {/* 기본정보 끝 */}
      {/* 참가자 */}
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
      {/* 참가자 끝 */}
      {/* 하단바 */}
      <div className="fixed bg-bg-300 bottom-0 w-full max-w-md flex px-5 items-center justify-between h-16 shadow-[0_-4px_4px_-1px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-light">
          {gameInfo.minParticipant < gameInfo.participants.length ? (
            <span>경기 진행이 확정되었어요</span>
          ) : (
            <span>
              경기 확정까지{' '}
              {gameInfo.minParticipant - gameInfo.participants.length}명
              남았어요
            </span>
          )}
        </div>
        <button onClick={handleApplyClick}>
          <div className="h-9 w-32 rounded-sm bg-text-white text-text-black flex items-center justify-center">
            신청하기
          </div>
        </button>
      </div>
      {/* 하단바 끝 */}
    </>
  );
}

export default GameDetail;

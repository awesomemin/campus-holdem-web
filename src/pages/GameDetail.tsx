import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameInfoBox from '../components/GameInfoBox';
import Header from '../components/Header';

interface Game {
  gameId: number;
  time: string;
  place: string;
  particifationFee: number;
  rebuyinFee: number;
  startingChip: number;
  startingBB: number;
  estimatedDurationInMinutes: number;
  maxParticipant: number;
  minimumParticipant: number;
}

interface Participant {
  profileImgUrl: string;
  name: string;
  ppi: number;
  isConfirmed: boolean;
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
    maxParticipant: 9,
    minimumParticipant: 6,
  };
  return new Promise((resolve) => setTimeout(() => resolve(gameData), 500));
};

const fetchParticipantsById = async (id: string): Promise<Participant[]> => {
  console.log(id);
  const participants = [
    { profileImgUrl: '123', name: '홀덤고수', ppi: 1000, isConfirmed: true },
    { profileImgUrl: '456', name: '안녕하세요', ppi: 1357, isConfirmed: true },
    {
      profileImgUrl: '789',
      name: '대학원의 망령',
      ppi: 1000,
      isConfirmed: true,
    },
    { profileImgUrl: '111', name: '오예', ppi: 1000, isConfirmed: false },
    { profileImgUrl: '222', name: 'wsop', ppi: 1000, isConfirmed: false },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(participants), 1000);
  });
};

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [gameInfoLoading, setGameInfoLoading] = useState<boolean>(true);
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const [participantsLoading, setParticipantsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGameData = async () => {
      if (!gameId) {
        setGameInfoLoading(false);
        return;
      }
      setGameInfoLoading(true);
      const data = await fetchGameById(gameId);
      setGameInfo(data);
      setGameInfoLoading(false);
    };
    const loadParticipantsData = async () => {
      if (!gameId) {
        setParticipantsLoading(false);
        return;
      }
      setParticipantsLoading(true);
      const data = await fetchParticipantsById(gameId);
      setParticipants(data);
      setParticipantsLoading(false);
    };
    loadGameData();
    loadParticipantsData();
  }, [gameId]);

  if (!gameId) return <div>not found</div>;

  return (
    <>
      <Header />
      {!gameInfo ? (
        <div>loading...</div>
      ) : (
        <GameInfoBox
          gameId={gameId}
          time={gameInfo.time}
          place={gameInfo.place}
        />
      )}

      {/* 기본정보 */}
      {gameInfoLoading || !gameInfo ? (
        <div>loading...</div>
      ) : (
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
      )}

      {/* 기본정보 끝 */}
      {/* 참가자 */}
      {participantsLoading || !participants || !gameInfo ? (
        <div>loading...</div>
      ) : (
        <div className="pl-5 pt-5">
          <div>
            <span className="font-medium text-xl mr-1">참가자</span>
            <span className="font-light">
              ({participants.length}/{gameInfo.maxParticipant})
            </span>
          </div>
        </div>
      )}
      {/* 참가자 끝 */}
    </>
  );
}

export default GameDetail;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameInfoBox from '../components/GameInfoBox';
import Header from '../components/Header';
import ParticipantsListItem from '../components/ParticipantsListItem';

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
  participants: Participant[];
}

interface Participant {
  profileImgUrl: string;
  name: string;
  ppi: number;
  isConfirmed: boolean;
}

const fetchGameById = async (id: string): Promise<Game> => {
  console.log('fetch data of game id', id);
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
    participants: [
      {
        profileImgUrl:
          'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggsuge49N6-hA1f27delS42-C0Ku0TeEfXvX0c2-aZgbDiTCCfFnlc9k3p-c0wTqyz87a9lMsSjh6H8pXbTVJQXgLJkbfrg7OaGluIcNyeGLbKn27f2D3mMlzyN-gqenRBhL_XJm9AfAM/s1600-rw/How+Long+Does+it+Take+to+Become+a+Professional+Poker+Player%253F.jpg',
        name: '홀덤고수',
        ppi: 1000,
        isConfirmed: true,
      },
      {
        profileImgUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsps8cftqZt3HKhEVCBl3dTRr5c6vurTOjVg&s',
        name: '안녕하세요',
        ppi: 1357,
        isConfirmed: true,
      },
      {
        profileImgUrl:
          'https://roarcdn.fitting-solutions.at/mgm/poker/en/blog/wp-content/uploads/2023/10/21115638/Body-Image-2-.jpg?strip=all&lossy=1&ssl=1&fit=1080%2C610',
        name: '대학원의 망령',
        ppi: 1000,
        isConfirmed: true,
      },
      {
        profileImgUrl:
          'https://roarblogs.s3.amazonaws.com/borgata/casino/en/blog/wp-content/uploads/2023/06/06043337/Header-Tilting-poker-player-ROAR-Bogata-Online.jpg',
        name: '오예',
        ppi: 1000,
        isConfirmed: false,
      },
      {
        profileImgUrl:
          'https://upswingpoker.com/wp-content/uploads/2019/08/bryn-kenney-1200x675.jpg',
        name: 'wsop',
        ppi: 1000,
        isConfirmed: false,
      },
    ],
  };
  return new Promise((resolve) => setTimeout(() => resolve(gameData), 500));
};

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
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
        time={gameInfo.time}
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
              key={participant?.name ?? 'blank' + i}
              participant={participant}
            />
          ))}
        </div>
      </div>
      {/* 참가자 끝 */}
      {/* 하단바 */}
      <div className="fixed bg-bg-300 bottom-0 w-full max-w-md flex px-5 items-center justify-between h-16 shadow-[0_-4px_4px_-1px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-light">
          {gameInfo.minimumParticipant < gameInfo.participants.length ? (
            <span>경기 진행이 확정되었어요</span>
          ) : (
            <span>경기 확정까지 1명 남았어요</span>
          )}
        </div>
        <button className="h-9 w-32 rounded-sm bg-text-white text-text-black">
          신청하기
        </button>
      </div>
      {/* 하단바 끝 */}
    </>
  );
}

export default GameDetail;

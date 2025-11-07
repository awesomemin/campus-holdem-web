import type { Game } from '../types/game';
import { formatNumber } from '../utils/datetime';

interface GameBasicInfoProps {
  gameInfo: Game | null;
  loading?: boolean;
}

function GameBasicInfo({ gameInfo, loading }: GameBasicInfoProps) {
  if (loading || !gameInfo)
    return (
      <div className="py-5 pl-5 border-b-8 border-bg-300">
        <div className="font-medium text-xl">기본정보</div>
        <div className="grid grid-cols-[72px_1fr] gap-x-5 gap-y-2 mt-3 ml-1">
          <div className="flex justify-between font-semibold">
            <span>참</span>
            <span>가</span>
            <span>비</span>
          </div>
          <span className="w-24 bg-bg-300 text-bg-300">.</span>

          <div className="flex justify-between font-semibold">
            <span>리</span>
            <span>바</span>
            <span>인</span>
            <span>비</span>
          </div>
          <span className="w-24 bg-bg-300 text-bg-300">.</span>

          <div className="flex justify-between font-semibold">
            <span>스</span>
            <span>타</span>
            <span>팅</span>
            <span>칩</span>
          </div>
          <span className="w-24 bg-bg-300 text-bg-300">.</span>

          <div className="flex justify-between font-semibold">
            <span>예</span>
            <span>상</span>
            <span>시</span>
            <span>간</span>
          </div>
          <span className="w-24 bg-bg-300 text-bg-300">.</span>
        </div>
      </div>
    );
  if (gameInfo)
    return (
      <div className="py-5 pl-5 border-b-8 border-bg-300">
        <div className="font-medium text-xl">기본정보</div>
        <div className="grid grid-cols-[72px_1fr] gap-x-5 gap-y-2 mt-3 ml-1">
          <div className="flex justify-between font-semibold">
            <span>참</span>
            <span>가</span>
            <span>비</span>
          </div>
          <span>{formatNumber(gameInfo.particifationFee)}원</span>

          <div className="flex justify-between font-semibold">
            <span>리</span>
            <span>바</span>
            <span>인</span>
            <span>비</span>
          </div>
          <span>{formatNumber(gameInfo.rebuyinFee)}원</span>

          <div className="flex justify-between font-semibold">
            <span>스</span>
            <span>타</span>
            <span>팅</span>
            <span>칩</span>
          </div>
          <span>
            {formatNumber(gameInfo.startingChip)} ({gameInfo.startingBB}BB)
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
    );
}

export default GameBasicInfo;

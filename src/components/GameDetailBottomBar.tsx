import type { Game } from '../types/game';

interface GameDetailBottomBarProps {
  gameInfo: Game | null;
  handleApplyClick: (() => void) | null;
  loading?: boolean;
}

function GameDetailBottomBar({
  gameInfo,
  handleApplyClick,
  loading,
}: GameDetailBottomBarProps) {
  if (loading)
    return (
      <div className="fixed bg-bg-300 bottom-0 w-full max-w-md flex px-5 items-center justify-between h-16 shadow-[0_-4px_4px_-1px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-light">
          <div className="w-36 bg-bg-200 text-bg-200 animate-pulse">.</div>
        </div>
        <button
          className="h-9 w-32 rounded-sm bg-text-white text-text-black flex items-center justify-center disabled:bg-bg-400 disabled:text-text-gray"
          disabled={true}
        >
          신청하기
        </button>
      </div>
    );
  if (gameInfo && handleApplyClick)
    return (
      <div className="fixed bg-bg-300 bottom-0 w-full max-w-md flex px-5 items-center justify-between h-16 shadow-[0_-4px_4px_-1px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-light">
          {gameInfo.status === 'PLANNED' ? (
            gameInfo.minParticipant <= gameInfo.participants.length ? (
              <span>경기 진행이 확정되었어요</span>
            ) : (
              <span>
                경기 확정까지{' '}
                {gameInfo.minParticipant - gameInfo.participants.length}명
                남았어요
              </span>
            )
          ) : (
            <span>신청할 수 없는 경기입니다.</span>
          )}
        </div>
        <button
          className="h-9 w-32 rounded-sm bg-text-white text-text-black flex items-center justify-center disabled:bg-bg-400 disabled:text-text-gray"
          onClick={handleApplyClick}
          disabled={gameInfo.status !== 'PLANNED'}
        >
          신청하기
        </button>
      </div>
    );
}

export default GameDetailBottomBar;

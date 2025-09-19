import { useLocation, useParams, useNavigate } from 'react-router';
import Header from '../components/Header';
import GameInfoBox from '../components/GameInfoBox';
import { useEffect, useState } from 'react';
import type { Game, Participant } from '../types/game';
import { fetchGameById } from '../api/game';
import BigButton from '../components/BigButton';
import { useAuth } from '../contexts/AuthContext';
import { formatDateTime, formatNumber } from '../utils/datetime';
import CheckInput from '../components/CheckInput';

function GameApply() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUsingTicket, setIsUsingTicket] = useState<boolean>(false);
  const [ticketBalance, setTicketBalance] = useState<number>(0);

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

  useEffect(() => {
    const fetchUserTicketBalance = async () => {
      if (!user) return;

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const getAccessToken = () => {
          const cookies = document.cookie.split(';');
          for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'access_token') {
              return value || null;
            }
          }
          return null;
        };

        const token = getAccessToken();
        if (!token) return;

        const response = await fetch(`${apiUrl}/users/${user.userId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setTicketBalance(userData.ticketBalance || 0);
        }
      } catch (error) {
        console.error('Failed to fetch user ticket balance:', error);
        setTicketBalance(0);
      }
    };

    fetchUserTicketBalance();
  }, [user]);

  // Reset ticket usage when no tickets available
  useEffect(() => {
    if (ticketBalance === 0) {
      setIsUsingTicket(false);
    }
  }, [ticketBalance]);

  const handleApplyClick = async () => {
    if (!gameId || !user) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const getAccessToken = () => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'access_token') {
            return value || null;
          }
        }
        return null;
      };

      const token = getAccessToken();
      if (!token) {
        alert('인증 토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }

      const response = await fetch(`${apiUrl}/games/${gameId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          useTicket: isUsingTicket,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '참가 신청에 실패했습니다.');
      }

      alert('참가 신청이 완료되었습니다!');
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Apply error:', error);
      alert(
        error instanceof Error
          ? error.message
          : '참가 신청 중 오류가 발생했습니다.'
      );
    }
  };

  if (!gameId) return <div>not found</div>;
  if (loading || !gameInfo) return <div>loading...</div>;
  return (
    <>
      <Header />
      <GameInfoBox
        gameId={gameId}
        time={formatDateTime(gameInfo.time)}
        place={gameInfo.place}
      />
      <div className="flex flex-col items-center h-full">
        <div className="font-semibold text-xl mt-12">
          {formatNumber(gameInfo.particifationFee)}원을 아래 계좌로
          입금해주세요.
        </div>
        <div className="mt-6">110-471-692503 신한은행 (오성민)</div>
        <div className="font-medium mt-10">
          입금 뒤 24시간 내로 참가 신청이 확정됩니다.
        </div>
        <div className="mt-10">
          보유 중인 무료 참가권: {formatNumber(ticketBalance)}장
        </div>
        <div
          className={
            'flex items-center ' +
            (ticketBalance === 0 ? 'line-through text-text-gray' : '')
          }
        >
          무료 참가권을 사용하여 참가 신청하기
          <CheckInput
            checked={isUsingTicket}
            onClick={() => {
              setIsUsingTicket((prev) => !prev);
            }}
            disabled={ticketBalance === 0}
          />
        </div>
        <div className="w-full px-10 mt-10">
          <BigButton
            content={
              isUsingTicket
                ? '무료 참가권으로 참가 신청'
                : '입금 완료 및 참가 신청'
            }
            onClick={handleApplyClick}
          />
        </div>
      </div>
    </>
  );
}

export default GameApply;

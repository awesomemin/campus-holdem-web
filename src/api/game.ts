import type { Game } from '../types/game';

export const fetchAllGames = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/games/all`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || '게임 정보 불러오기를 실패했습니다.'
      );
    }
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchGameById = async (gameId: string): Promise<Game> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/games/${gameId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || '게임 정보 불러오기를 실패했습니다.'
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { authenticatedFetch } from '../utils/api';

export interface UserRankingDto {
  userId: number;
  nickname: string;
  profilePictureUrl: string | null;
  ppi: number;
  rank: number;
}

export interface UserRankingsResponseDto {
  rankings: UserRankingDto[];
  total: number;
  page: number;
  limit: number;
  myRanking?: UserRankingDto;
}

export const fetchRankings = async (
  page: number
): Promise<UserRankingsResponseDto> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await authenticatedFetch(
      `${apiUrl}/users/rankings?page=${page}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || '랭킹 정보 불러오기를 실패했습니다.'
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

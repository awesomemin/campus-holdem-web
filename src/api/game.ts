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

export const fetchGameById = async (id: string): Promise<Game> => {
  console.log('fetch data of game id', id);
  const gameData = {
    id: 2,
    time: '2025. 8. 23(토) 17:00',
    place: '성균관대학교 제2공학관 공과대학 세미나실(26119B)',
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

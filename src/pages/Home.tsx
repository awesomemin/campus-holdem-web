import GameListItem from '../components/GameListItem';
import Header from '../components/Header';

function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        게임 목록
      </div>
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={1}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={2}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={3}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={4}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={5}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={6}
        maxParticipant={9}
        curParticipant={9}
      />
      <GameListItem
        time="2025. 8. 23(토) 17:00"
        place="성균관대학교 산학협력관 85529"
        gameId={7}
        maxParticipant={9}
        curParticipant={9}
      />
    </>
  );
}

export default Home;

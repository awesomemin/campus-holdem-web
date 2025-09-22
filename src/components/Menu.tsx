import Close from '@mui/icons-material/Close';
import Chat from '@mui/icons-material/Chat';
import Leaderboard from '@mui/icons-material/Leaderboard';
import MenuListItem from './MenuListItem';
import { useNavigate } from 'react-router';

interface MenuProps {
  toggleMenu: () => void;
}

function HeaderMenu({ toggleMenu }: MenuProps) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 right-0 bg-bg-200 z-50 min-h-screen">
      <div className="flex justify-end p-4">
        <Close
          className="cursor-pointer"
          sx={{ fontSize: 32 }}
          onClick={toggleMenu}
        />
      </div>
      <div className="flex flex-col px-8">
        {/* Menu content will be added here */}
        <MenuListItem
          content="오픈채팅 (고객센터)"
          onClick={() => {
            window.open('https://open.kakao.com/o/gyMGy3th', '_blank');
          }}
        >
          <Chat sx={{ color: '#fae100' }} />
        </MenuListItem>
        <MenuListItem
          content="랭킹"
          onClick={() => {
            navigate('/rankings');
          }}
        >
          <Leaderboard sx={{ color: '#ed1111' }} />
        </MenuListItem>
      </div>
    </div>
  );
}

export default HeaderMenu;

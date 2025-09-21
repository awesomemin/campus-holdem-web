import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import Person from '@mui/icons-material/Person';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Chat from '@mui/icons-material/Chat';
import Leaderboard from '@mui/icons-material/Leaderboard';
import { useAuth } from '../contexts/AuthContext';
import UserMenuListItem from './UserMenuListItem';

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="h-[60px] flex items-center text-2xl pl-4 shadow-md font-semibold">
        <Menu
          className="mr-2 cursor-pointer"
          sx={{ fontSize: 28 }}
          onClick={toggleMenu}
        />
        <Link to="/">성균홀덤대회</Link>
        <Link
          className="ml-auto mr-[18px]"
          to={user ? `/user/${user.userId}` : '/login'}
        >
          <Person />
        </Link>
      </div>
      {isMenuOpen && (
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
            <UserMenuListItem
              content="오픈채팅"
              onClick={() => {
                window.open('https://open.kakao.com/o/gyMGy3th', '_blank');
              }}
            >
              <Chat sx={{ color: '#fae100' }} />
            </UserMenuListItem>
            <UserMenuListItem
              content="랭킹"
              onClick={() => {
                navigate('/rankings');
              }}
            >
              <Leaderboard sx={{ color: '#ed1111' }} />
            </UserMenuListItem>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

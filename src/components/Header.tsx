import { Link } from 'react-router';
import { useState } from 'react';
import Person from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';
import HeaderMenu from './Menu';

function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="h-[60px] flex items-center text-2xl pl-4 shadow-md font-semibold">
        <MenuIcon
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
      {isMenuOpen && <HeaderMenu toggleMenu={toggleMenu} />}
    </div>
  );
}

export default Header;

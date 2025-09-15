import { Link } from 'react-router';
import Person from '@mui/icons-material/Person';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user } = useAuth();
  return (
    <div className="h-[60px] flex items-center text-2xl pl-4 shadow-md font-semibold">
      <Link to="/">성균홀덤대회</Link>
      <Link
        className="ml-auto mr-[18px]"
        to={user ? `/user/${user.userId}` : 'login'}
      >
        <Person />
      </Link>
    </div>
  );
}

export default Header;

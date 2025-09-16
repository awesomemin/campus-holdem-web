import UserMenuList from './UserMenuList';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

function PrivateUserMenuList() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col mx-4">
      <UserMenuList content="로그아웃" onClick={handleLogout}>
        <Logout />
      </UserMenuList>
    </div>
  );
}

export default PrivateUserMenuList;

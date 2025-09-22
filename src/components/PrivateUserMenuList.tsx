import MenuListItem from './MenuListItem';
import Logout from '@mui/icons-material/Logout';
import EventAvailable from '@mui/icons-material/EventAvailable';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

function PrivateUserMenuList() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApplyList = () => {
    navigate('applyList');
  };

  return (
    <div className="flex flex-col mx-4">
      <MenuListItem content="신청내역" onClick={handleApplyList}>
        <EventAvailable sx={{ color: '#00c896' }} />
      </MenuListItem>
      <MenuListItem content="로그아웃" onClick={handleLogout}>
        <Logout />
      </MenuListItem>
    </div>
  );
}

export default PrivateUserMenuList;

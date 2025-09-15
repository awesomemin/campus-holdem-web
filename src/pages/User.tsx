import Header from '../components/Header';
import Edit from '@mui/icons-material/Edit';
import DefaultProfileImgUrl from '../assets/defaultprofile.png';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function User() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>can't find user info</div>;
  }

  return (
    <>
      <Header />
      <div className="flex h-30 items-center">
        <div>
          <img
            src={DefaultProfileImgUrl}
            className="bg-text-white w-15 h-15 rounded-full ml-[30px]"
          />
        </div>
        <div className="flex flex-col ml-4 gap-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">{user.nickname}</span>
            <span className="font-light text-sm text-text-gray">
              [{user.userId}]
            </span>
          </div>
          <div className="font-light text-sm">{user.email}</div>
        </div>
        <Edit className="text-text-gray ml-auto mr-[30px]" />
      </div>
    </>
  );
}

export default User;

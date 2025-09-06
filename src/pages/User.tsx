import Header from '../components/Header';
import Edit from '@mui/icons-material/Edit';
import DefaultProfileImgUrl from '../assets/defaultprofile.png';

function User() {
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
            <span className="font-semibold text-xl">홀덤고수</span>
            <span className="font-light text-sm text-text-gray">[1]</span>
          </div>
          <div className="font-light text-sm">saogig0503@naver.com</div>
        </div>
        <Edit className="text-text-gray ml-auto mr-[30px]" />
      </div>
    </>
  );
}

export default User;

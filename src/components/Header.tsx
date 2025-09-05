import { Link } from 'react-router';
import Person from '@mui/icons-material/Person';

function Header() {
  return (
    <div className="h-[60px] flex items-center text-2xl pl-4 shadow-md font-semibold">
      <Link to="/">성균홀덤대회</Link>
      <Person className="ml-auto mr-[18px]" />
    </div>
  );
}

export default Header;

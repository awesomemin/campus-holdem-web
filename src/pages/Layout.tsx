import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-bg-200">
      <Outlet />
    </div>
  );
}

export default Layout;

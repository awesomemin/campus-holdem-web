import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="min-h-screen max-w-md bg-dark-bg mx-auto">
      <Outlet />
    </div>
  );
}

export default Layout;

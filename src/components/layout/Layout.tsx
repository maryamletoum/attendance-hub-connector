
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';

interface LayoutProps {
  logout: () => void;
}

const Layout = ({ logout }: LayoutProps) => {
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    logout();
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header logout={handleLogout} />
        <main className="flex-1 py-6 px-6 md:px-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

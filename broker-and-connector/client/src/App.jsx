import { Outlet } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <ToastProvider>
      <div className='w-full h-screen bg-background flex justify-center py-20 font-mono'>
        <div className='w-full max-w-[70%] h-full'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </ToastProvider>
  );
};

export default App;

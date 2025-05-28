import { Outlet } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';

const App = () => {
  return (
    <ToastProvider>
      <div>
        <Outlet />
      </div>
    </ToastProvider>
  );
};

export default App;

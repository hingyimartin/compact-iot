import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ id, message, type, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const startFadeOutTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    const removeTimer = setTimeout(() => {
      onClose(id);
    }, duration + 500);

    return () => {
      clearTimeout(startFadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [id, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 500);
  };

  // Icon selection
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className='w-5 h-5 text-emerald-500' />;
      case 'error':
        return <AlertCircle className='w-5 h-5 text-red-500' />;
      case 'warning':
        return <AlertTriangle className='w-5 h-5 text-amber-500' />;
      case 'info':
        return <Info className='w-5 h-5 text-blue-500' />;
      default:
        return <Info className='w-5 h-5 text-blue-500' />;
    }
  };

  // Background and text colors
  const getBackgroundAndTextColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  // Progress bar color
  const getProgressBarBackground = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className={`relative flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        transition-all duration-500 ease-in-out transform
        ${getBackgroundAndTextColor()}
        ${
          visible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
    >
      {/* Icon */}
      <div className='flex-shrink-0'>{getIcon()}</div>

      {/* Message */}
      <div className='flex-1 font-medium text-sm leading-relaxed'>
        {message}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className='flex-shrink-0 p-1 rounded-md transition-colors duration-200
          hover:bg-black/5 focus:outline-none'
        aria-label='Close'
      >
        <X className='w-4 h-4' />
      </button>

      {/* Progress Bar */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-black/10 rounded-b-lg overflow-hidden'>
        <div
          className={`h-full ${getProgressBarBackground()} rounded-b-lg origin-left`}
          style={{
            animation: `toast-progress-animation2 ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export default Toast;

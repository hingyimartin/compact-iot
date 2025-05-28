import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast }) => {
  const positions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'top-center',
    'bottom-center',
  ];

  const getPositionClasses = (position) => {
    const base = 'fixed z-50 flex flex-col gap-2 max-w-xs';
    const map = {
      'top-left': 'top-5 left-5 items-start',
      'top-right': 'top-5 right-5 items-end',
      'bottom-left': 'bottom-5 left-5 items-start',
      'bottom-right': 'bottom-5 right-5 items-end',
      'top-center': 'top-5 left-1/2 transform -translate-x-1/2 items-center',
      'bottom-center':
        'bottom-5 left-1/2 transform -translate-x-1/2 items-center',
    };
    return `${base} ${map[position] || map['top-right']}`;
  };

  return (
    <>
      {positions.map((pos) => (
        <div key={pos} className={getPositionClasses(pos)}>
          {toasts
            .filter((t) => t.position === pos)
            .map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onClose={removeToast}
              />
            ))}
        </div>
      ))}
    </>
  );
};

export default ToastContainer;

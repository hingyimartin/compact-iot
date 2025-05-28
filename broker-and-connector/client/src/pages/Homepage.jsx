import { useToast } from '../contexts/ToastContext';

const Homepage = () => {
  const { addToast } = useToast();
  return (
    <div>
      <button
        onClick={() => {
          addToast(
            'Lorem ipsum dolor sit amet consectetur',
            'success',
            3000,
            'top-right'
          );
          addToast(
            'Lorem ipsum dolor sit amet consectetur',
            'error',
            3000,
            'top-right'
          );
          addToast(
            'Lorem ipsum dolor sit amet consectetur',
            'info',
            3000,
            'top-right'
          );
          addToast(
            'Lorem ipsum dolor sit amet consectetur',
            'warning',
            3000,
            'top-right'
          );
        }}
      >
        Toast!
      </button>
    </div>
  );
};

export default Homepage;

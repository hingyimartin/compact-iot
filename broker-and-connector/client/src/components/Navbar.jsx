import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const active = location.pathname;
  return (
    <div className='mb-10 flex items-center gap-20'>
      <h1
        className={`nav-link ${
          active === '/'
            ? 'border-b-2 border-primary'
            : 'border-b-2 border-primary/20'
        }`}
      >
        Homepage
      </h1>
      <h1
        className={`nav-link ${
          active === '/connections'
            ? 'border-b-2 border-primary'
            : 'border-b-2 border-primary/20'
        }`}
      >
        Connections
      </h1>
      <h1
        className={`nav-link ${
          active === '/clients'
            ? 'border-b-2 border-primary'
            : 'border-b-2 border-primary/20'
        }`}
      >
        Clients
      </h1>
    </div>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/connections`)
      .then((res) => res.json())
      .then((data) => setConnections(data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Existing connections</h1>
      <div className='grid grid-cols-2 gap-6'>
        {connections &&
          connections.map((item) => {
            return (
              <div
                className='border border-secondary rounded p-4 flex flex-col hover:border-primary'
                key={item._id}
              >
                <h1 className='text-sm text-text/70 border-b border-secondary pb-4'>
                  id: {item._id}
                </h1>
                <div className='mt-2 border-b border-secondary pb-2'>
                  <p>Host: {item.host}</p>
                  <p>Port: {item.port}</p>
                  <p>Topic: {item.topic}</p>
                </div>
                <div className='mt-2 border-b border-secondary pb-2'>
                  <h1>Type: {item.type}</h1>
                  <h1>Database: {item.database}</h1>
                  <h1>Username: {item.username}</h1>
                </div>
                <div className='mt-4 w-full flex flex-col items-end text-sm text-text/70'>
                  <h1>
                    Created at: {new Date(item.createdAt).toLocaleString()}
                  </h1>
                  <h1>
                    Updated at: {new Date(item.updatedAt).toLocaleString()}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;

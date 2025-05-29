import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Server,
  ChevronsLeftRightEllipsis,
  MessageSquareText,
  RotateCcw,
  Database,
  Cable,
  User,
  KeyRound,
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Homepage = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [displayConnectors, setDisplayConnectors] = useState(false);
  const { addToast } = useToast();
  const [dbType, setDbType] = useState('');

  const lockInBroker = () => {
    if (!formData.host || !formData.port || !formData.topic) {
      addToast('All fields are required!', 'error', 3000, 'top-right');
      return;
    }
    setDisplayConnectors(true);
    setAnimationKey((prev) => prev + 1);
  };

  const createConnection = () => {};

  const resetProgress = () => {
    setDisplayConnectors(false);
    setAnimationKey(0);
    setFormData({
      host: '',
      port: '',
      topic: '',
      database: '',
      databaseName: '',
      user: '',
    });
  };
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    topic: '',
    database: '',
    databaseName: '',
    user: '',
  });

  const updateFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'database') {
      setDbType(e.target.value);
    }
  };
  return (
    <div className='flex flex-col gap-10'>
      {/* Upper broker and connector part */}
      <div className='flex gap-10'>
        {/* MQTT */}
        <div
          className={`w-1/2 flex flex-col gap-10 ${
            displayConnectors && 'opacity-40 pointer-events-none'
          }`}
        >
          <h1 className='text-2xl font-bold'>Connect to broker</h1>
          <div className='border border-secondary p-10 rounded flex flex-col gap-10'>
            <div className='flex flex-col'>
              <label
                className='text-lg uppercase font-semibold flex items-center gap-2'
                htmlFor='host'
              >
                <span>
                  <Server className='text-primary' />
                </span>
                Host
              </label>
              <input
                type='text'
                name='host'
                value={formData.host}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-lg uppercase font-semibold flex items-center gap-2'
                htmlFor='port'
              >
                <span>
                  <ChevronsLeftRightEllipsis className='text-primary' />
                </span>
                Port
              </label>
              <input
                type='text'
                name='port'
                value={formData.port}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='text-lg uppercase font-semibold flex items-center gap-2'
                htmlFor='topic'
              >
                <span>
                  <MessageSquareText className='text-primary' />
                </span>
                Topic
              </label>
              <input
                type='text'
                name='topic'
                value={formData.topic}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <button
              onClick={lockInBroker}
              className='uppercase bg-primary text-white py-2 rounded hover:bg-accent text-lg'
            >
              Lock in
            </button>
          </div>
        </div>
        {/* Connector */}
        <div className='w-1/2 flex flex-col gap-10'>
          <AnimatePresence>
            {displayConnectors && (
              <>
                <motion.h1
                  key={animationKey}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: 100, opacity: 0 }}
                  className='text-2xl font-bold flex items-center gap-3'
                >
                  Select a connector
                  <button
                    onClick={resetProgress}
                    className='bg-secondary text-text py-1 rounded px-2 flex items-center gap-2 text-sm'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Start again
                  </button>
                </motion.h1>

                <motion.div
                  key={animationKey}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: 100, opacity: 0 }}
                  className='border border-secondary p-10 rounded flex flex-col gap-10'
                >
                  <div className='flex flex-col'>
                    <label
                      className='text-lg uppercase font-semibold flex items-center gap-2'
                      htmlFor='database'
                    >
                      <span>
                        <Cable className='text-primary' />
                      </span>
                      Connector
                    </label>
                    <select
                      name='database'
                      value={formData.database}
                      onChange={updateFormData}
                      className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
                    >
                      <option value=''>select a connector...</option>
                      <option value='mssql'>MSSQl</option>
                      <option value='mongodb'>MongoDB</option>
                      <option value='postgresql'>PostgreSQL</option>
                    </select>
                  </div>
                  {dbType === 'mssql' && <></>}
                  {dbType === 'mongodb' && <></>}
                  {dbType === 'postgresql' && <></>}
                  <div className='flex flex-col'>
                    <label
                      className='text-lg uppercase font-semibold flex items-center gap-2'
                      htmlFor='databaseName'
                    >
                      <span>
                        <Database className='text-primary' />
                      </span>
                      Database
                    </label>
                    <input
                      type='text'
                      name='databaseName'
                      value={formData.databaseName}
                      onChange={updateFormData}
                      className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      className='text-lg uppercase font-semibold flex items-center gap-2'
                      htmlFor='username'
                    >
                      <span>
                        <User className='text-primary' />
                      </span>
                      Username
                    </label>
                    <input
                      type='text'
                      name='username'
                      value={formData.username}
                      onChange={updateFormData}
                      className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label
                      className='text-lg uppercase font-semibold flex items-center gap-2'
                      htmlFor='password'
                    >
                      <span>
                        <KeyRound className='text-primary' />
                      </span>
                      Password
                    </label>
                    <input
                      type='text'
                      name='password'
                      value={formData.password}
                      onChange={updateFormData}
                      className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
                    />
                  </div>
                  <button
                    onClick={createConnection}
                    className='uppercase bg-primary text-white py-2 rounded hover:bg-accent text-lg'
                  >
                    Create
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Lower overview */}
      <div>
        <AnimatePresence>
          {displayConnectors && (
            <>
              <motion.h1
                key={animationKey}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                exit={{ y: -100, opacity: 0 }}
                className='text-2xl font-bold mb-6 border-b border-secondary pb-2'
              >
                Overview
              </motion.h1>
              <div className='grid grid-cols-3 gap-6'>
                <motion.div
                  key={animationKey}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: -100, opacity: 0 }}
                  className='border border-secondary rounded p-6'
                >
                  <h1 className='mb-6'>Broker</h1>
                  <div className=''>
                    <h1>HOST: {formData.host}</h1>
                    <h1>PORT: {formData.port}</h1>
                    <h1>TOPIC: {formData.topic}</h1>
                  </div>
                </motion.div>
                <motion.div
                  key={animationKey}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: -100, opacity: 0 }}
                  className='border border-secondary rounded p-6'
                >
                  tr
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Homepage;

import { useState } from 'react';
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
  ArrowBigLeft,
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Homepage = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [connectorOverviewAnimationKey, setConnectorOverviewAnimationKey] =
    useState(0);
  const [createAnimationKey, setCreateAnimationKey] = useState(0);
  const [displayBrokerOverview, setDisplayBrokerOverview] = useState(false);
  const [displayConnectorOverview, setDisplayConnectorOverview] =
    useState(false);
  const { addToast } = useToast();
  const [dbType, setDbType] = useState('');

  const lockInBroker = () => {
    if (!formData.host || !formData.port || !formData.topic) {
      addToast('All fields are required!', 'error');
      return;
    }
    setDisplayBrokerOverview(true);
    setAnimationKey((prev) => prev + 1);
  };

  const lockInConnector = () => {
    if (
      !formData.host ||
      !formData.port ||
      !formData.topic ||
      !formData.database ||
      !formData.databaseName ||
      !formData.username ||
      !formData.password
    ) {
      addToast('All fields are required!', 'error');
      return;
    }
    setDisplayConnectorOverview(true);
    setConnectorOverviewAnimationKey((prev) => prev + 1);
  };

  // three parameters: [1 - reset from connector state], [2 - reset from overview], [3 - reset whole process]
  const resetProgress = (state) => {
    if (state === 1) {
      setDisplayBrokerOverview(false);
      setAnimationKey(0);
      setFormData((prev) => ({
        ...prev,
        database: '',
        databaseName: '',
        username: '',
        password: '',
      }));
    }
    if (state === 2) {
      setDisplayConnectorOverview(false);
      setConnectorOverviewAnimationKey(0);
    }

    if (state === 3) {
      setCreateAnimationKey((prev) => prev + 1);
      setConnectorOverviewAnimationKey(0);
      setAnimationKey(0);
      setDisplayBrokerOverview(false);
      setDisplayConnectorOverview(false);

      setFormData({
        host: '',
        port: '',
        topic: '',
        database: '',
        databaseName: '',
        username: '',
        password: '',
      });
    }
  };
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    topic: '',
    database: '',
    databaseName: '',
    username: '',
    password: '',
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

  const createConnection = async () => {
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/connections`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            host: formData.host,
            port: parseInt(formData.port, 10),
            topic: formData.topic,
            type: formData.database,
            database: formData.databaseName,
            username: formData.username,
            password: formData.password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Unexpected error!');
      }
      addToast('Connection created!', 'success');
      setCreateAnimationKey((prev) => prev + 1);
      setConnectorOverviewAnimationKey(0);
      setAnimationKey(0);
      setDisplayBrokerOverview(false);
      setDisplayConnectorOverview(false);
      setFormData({
        host: '',
        port: '',
        topic: '',
        database: '',
        databaseName: '',
        username: '',
        password: '',
      });
    } catch (error) {
      addToast(`${error.message || 'Unexpected error!'}`, 'error');
    }
  };

  return (
    <div className='flex flex-col gap-10'>
      {/* Upper broker and connector part */}
      <div className='flex gap-10'>
        {/* MQTT */}
        <div
          className={`w-1/2 flex flex-col gap-10 ${
            displayBrokerOverview && 'opacity-40 pointer-events-none'
          }`}
        >
          <h1 className='text-2xl font-bold'>Connect to broker</h1>
          <div className='border border-secondary p-10 rounded flex flex-col gap-10'>
            <div className='flex flex-col'>
              <label
                htmlFor='host'
                className='text-lg uppercase font-semibold flex items-center gap-2'
              >
                <span>
                  <Server className='text-primary' />
                </span>
                Host<span className='text-text/50'>(localhost, 127.0.0.1)</span>
              </label>
              <input
                type='text'
                name='host'
                aria-label='host'
                id='host'
                value={formData.host}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='port'
                className='text-lg uppercase font-semibold flex items-center gap-2'
              >
                <span>
                  <ChevronsLeftRightEllipsis className='text-primary' />
                </span>
                Port
                <span className='text-text/50'>(1883, 1443, 5432)</span>
              </label>
              <input
                id='port'
                type='text'
                name='port'
                aria-label='port'
                value={formData.port}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='topic'
                className='text-lg uppercase font-semibold flex items-center gap-2'
              >
                <span>
                  <MessageSquareText className='text-primary' />
                </span>
                Topic
                <span className='text-text/50'>(.../.../...)</span>
              </label>
              <input
                id='topic'
                type='text'
                name='topic'
                aria-label='topic'
                value={formData.topic}
                onChange={updateFormData}
                className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
              />
            </div>
            <button
              onClick={lockInBroker}
              aria-label='lock_in_broker'
              className='uppercase bg-primary text-white py-2 rounded hover:bg-accent text-lg'
            >
              Lock in
            </button>
          </div>
        </div>
        {/* Connector */}
        <div
          className={`w-1/2 flex flex-col gap-10 ${
            displayConnectorOverview && 'opacity-40 pointer-events-none'
          }`}
        >
          <AnimatePresence>
            {displayBrokerOverview && (
              <>
                <motion.h1
                  key={`connector-title-${animationKey}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: 100, opacity: 0 }}
                  className='text-2xl font-bold flex items-center gap-3'
                >
                  Select a connector
                  <button
                    aria-label='back_connector'
                    onClick={() => resetProgress(1)}
                    className='bg-secondary text-text py-1 rounded px-2 flex items-center gap-2 text-sm'
                  >
                    <ArrowBigLeft className='w-4 h-4' />
                    Back
                  </button>
                </motion.h1>

                <motion.div
                  key={`connector-panel-${animationKey}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: 100, opacity: 0 }}
                  className='border border-secondary p-10 rounded flex flex-col gap-10'
                >
                  <div className='flex flex-col'>
                    <label className='text-lg uppercase font-semibold flex items-center gap-2'>
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
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={updateFormData}
                      className='border-b-2 border-secondary bg-background focus:outline-none focus:border-b-2 focus:border-primary py-2 text-text/80'
                    />
                  </div>
                  <button
                    onClick={lockInConnector}
                    aria-label='lock_in_connector'
                    className='uppercase bg-primary text-white py-2 rounded hover:bg-accent text-lg'
                  >
                    Lock in
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
          {displayBrokerOverview && (
            <>
              <motion.h1
                key={`overview-title-${animationKey}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                exit={{ y: -100, opacity: 0 }}
                className='text-2xl font-bold mb-6 border-b border-secondary pb-2 flex items-center gap-3'
              >
                Overview{' '}
                <button
                  aria-label='back_overview'
                  onClick={() => resetProgress(2)}
                  className='bg-secondary text-text py-1 rounded px-2 flex items-center gap-2 text-sm'
                >
                  <ArrowBigLeft className='w-4 h-4' />
                  Back
                </button>
              </motion.h1>
              <div className='grid grid-cols-3 gap-6 mb-6'>
                <motion.div
                  key={`broker-details-${animationKey}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  exit={{ x: -100, opacity: 0 }}
                  className='border border-secondary rounded p-6'
                >
                  <h1 className='mb-6 text-lg'>Broker</h1>
                  <div className='text-text/70'>
                    <h1>HOST: {formData.host}</h1>
                    <h1>PORT: {formData.port}</h1>
                    <h1>TOPIC: {formData.topic}</h1>
                    <h1>&nbsp;</h1>
                  </div>
                </motion.div>
                {displayConnectorOverview && (
                  <motion.div
                    key={`connector-details-${connectorOverviewAnimationKey}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    exit={{ y: 100, opacity: 0 }}
                    className='border border-secondary rounded p-6'
                  >
                    <h1 className='mb-6 text-lg'>Connector</h1>
                    <div className='text-text/70'>
                      <h1>TYPE: {formData.database}</h1>
                      <h1>DATABASE: {formData.databaseName}</h1>
                      <h1>USERNAME: {formData.username}</h1>
                      <h1>PASSWORD: {formData.password}</h1>
                    </div>
                  </motion.div>
                )}
              </div>
              <motion.div
                key={`create-${createAnimationKey}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                exit={{ x: -100, opacity: 0 }}
                className='flex items-center gap-4'
              >
                <button
                  aria-label='start_again'
                  onClick={() => resetProgress(3)}
                  className='uppercase bg-secondary text-text py-2 rounded text-lg w-1/6 flex items-center justify-center gap-2'
                >
                  <RotateCcw className='w-4 h-4' />
                  Start again
                </button>
                <button
                  onClick={createConnection}
                  aria-label='create'
                  className='uppercase bg-primary text-white py-2 rounded hover:bg-accent text-lg w-1/6'
                >
                  Create
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Homepage;

import mqtt from 'mqtt';
import Connection from '../models/connectionModel.js';

const subscribers = {};

// Create new subscriber, called in initSubscribers and listeningForNewSubscribers
export function createSubscriber({
  host,
  port,
  topic,
  id,
  type,
  database,
  username,
  password,
}) {
  // TODO: validation
  const url = `mqtt://${host}:${port}`;
  const client = mqtt.connect(url, {
    clientId: id,
  });

  client.on('connect', () => {
    console.log(`[${id}]: connected (mqtt://${host}:${port})`);
    client.subscribe(topic, (error) => {
      if (error) {
        console.log(`[${id}] failed to subscribe (${topic})`);
      } else {
        console.log(`[${id}]: subscribed (${topic})`);
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log(
      `[${id}] received a message from topic (${topic}): ${message.toString()}`
    );
    console.log(`[${id}]'s db config: ${type} - ${database} - ${username}`);
  });

  subscribers[id] = client;
}

// Initialize existing subscribers on server start
export async function initSubscribers() {
  try {
    const connections = await Connection.find();
    connections.forEach((conn) => {
      createSubscriber({
        host: conn.host,
        port: conn.port,
        topic: conn.topic,
        id: conn._id.toString(),
        type: conn.type,
        database: conn.database,
        username: conn.username,
        password: conn.password,
      });
    });
    console.log(
      `[BROKER]: initialized ${connections.length} existing subscribers`
    );
  } catch (err) {
    console.error('[BROKER]: failed to initialize subscribers:', err);
  }
}

// ChangeStream, listening for new subscribers in database
export function listeningForNewSubscribers() {
  const changeStream = Connection.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const conn = change.fullDocument;
      createSubscriber({
        host: conn.host,
        port: conn.port,
        topic: conn.topic,
        id: conn._id.toString(),
        type: conn.type,
        database: conn.database,
        username: conn.username,
        password: conn.password,
      });
      console.log(`[BROKER]: new subscriber created (${id})`);
    }
  });
  console.log('[BROKER]: listening for new subscribers...');
}

// Exports subs if needed
export { subscribers };

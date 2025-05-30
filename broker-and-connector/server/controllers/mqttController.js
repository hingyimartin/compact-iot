import mqtt from 'mqtt';

const subscribers = {};

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
  const client = mqtt.connect(`mqtt://${host}:${port}`, {
    clientId: id,
  });

  client.on('connect', () => {
    console.log(`[${id}] connected to mqtt://${host}:${port}`);
    client.subscribe(topic, (error, granted) => {
      if (error) {
        console.log(`[${id}] failed to subscribe to ${topic}`, error);
      } else {
        console.log(`[${id} subscribed to ${topic}] granted:`, granted);
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

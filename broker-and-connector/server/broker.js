import aedes from 'aedes';
import net from 'net';
import dotenv from 'dotenv';

dotenv.config();

// Win cmd command to check if broker listens on port: netstat -an | findstr 1883

// TODO: Create authentication and authorization functions
const broker = aedes({
  id: 'local-broker',
  authenticate: (client, username, password, callback) => {
    callback(null, true);
  },
  authorizePublish: (client, packet, callback) => {
    callback(null, true);
  },

  authorizeSubscribe: (client, sub, callback) => {
    callback(null, sub);
  },
});

// TODO: Logging events
broker.on('client', (client) => {
  console.log(`[BROKER]: Client ${client.id} connected`);
});

broker.on('clientDisconnect', (client) => {
  console.log(`[BROKER]: Client ${client.id} disconnected`);
});

broker.on('subscribe', (subscriptions, client) => {
  console.log(
    `[BROKER]: Client ${client.id} subscribed (${subscriptions.map(
      (s) => s.topic
    )})`
  );
});

broker.on('publish', (packet, client) => {
  if (client) {
    `[BROKER]: Client ${client.id} published (${packet.payload.toString()})`;
  }
});

const server = net.createServer(broker.handle);

server.listen(process.env.MQTT_PORT || 1883, () => {
  console.log(`[BROKER]: running on port: ${process.env.MQTT_PORT || 1883}`);
});

// Export the broker and server to use their data in other modules
export { broker, server };

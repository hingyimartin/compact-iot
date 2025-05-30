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
  console.log(`Client connected: ${client.id}`);
});

broker.on('clientDisconnect', (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

broker.on('subscribe', (subscriptions, client) => {
  console.log(
    `Client ${client.id} subscribed to:`,
    subscriptions.map((s) => s.topic)
  );
});

broker.on('publish', (packet, client) => {
  if (client) {
    /*console.log(
      `Message from client ${client.id}: topic=${
        packet.topic
      } payload=${packet.payload.toString()}`
    );*/
  }
});

const server = net.createServer(broker.handle);

server.listen(process.env.MQTT_PORT || 1883, () => {
  console.log(`MQTT broker running on port: ${process.env.MQTT_PORT || 1883}`);
});

// Export the broker and server to use their data in other modules
export { broker, server };

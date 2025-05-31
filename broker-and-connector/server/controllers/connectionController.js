import Connection from '../models/connectionModel.js';
import bcrypt from 'bcrypt';

export const getConnections = async (request, response) => {
  try {
    const connections = await Connection.find().select('-password -__v');
    response.json(connections);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const createConnection = async (request, response) => {
  try {
    const { host, port, topic, type, database, username, password } =
      request.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const connection = new Connection({
      host,
      port,
      topic,
      type,
      database,
      username,
      password: hashedPassword,
    });
    await connection.save();
    const newConnection = connection.toObject();
    delete newConnection.password;
    response.status(201).json(newConnection);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

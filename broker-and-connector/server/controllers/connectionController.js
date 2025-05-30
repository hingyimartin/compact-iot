import Connection from '../models/connectionModel.js';
import bcrypt from 'bcrypt';

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
    response.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

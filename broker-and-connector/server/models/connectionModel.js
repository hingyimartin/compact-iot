import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema(
  {
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    database: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Connection', connectionSchema);

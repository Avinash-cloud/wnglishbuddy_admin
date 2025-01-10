// models/Session.js

import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model from the schema
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;

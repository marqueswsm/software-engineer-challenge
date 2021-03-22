import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  username: String,
  priority: Number,
});

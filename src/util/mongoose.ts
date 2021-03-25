import * as mongoose from 'mongoose';

import { env } from './env';

mongoose.connect(env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export function database(model: string, schema: mongoose.Schema) {
  return mongoose.model(model, schema);
}

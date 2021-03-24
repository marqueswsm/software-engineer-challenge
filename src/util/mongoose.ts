import * as mongoose from 'mongoose';
import { env } from './env';

mongoose.connect(`${env.mongoUrl}${env.mongoDatabase}`, {
  authSource: env.mongoAuthSource,
  user: env.mongoUserName,
  pass: env.mongoPassword,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export function database(model: string, schema: mongoose.Schema) {
  return mongoose.model(model, schema);
}

import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/SoftwareEngineerTest', {
  authSource: 'admin',
  user: 'root',
  pass: 'root',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export function database(model: string, schema: mongoose.Schema) {
  return mongoose.model(model, schema);
}

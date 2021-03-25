import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  username: String,
  priority: Number,
});

userSchema.plugin(paginate);

export { userSchema };

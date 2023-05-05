import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    // ref indica que esta asociado con un modelo de datos
    type: Schema.Types.ObjectId,
    ref: 'role',
  }],
}, {
  timestamps: true,
  versionKey: false,
});

// static sirve para usar metodo sin instanciar un objeto
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(15);
  return bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => bcrypt.compare(password, receivedPassword);

export default model('User', userSchema);

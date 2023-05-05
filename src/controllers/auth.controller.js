import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import role from '../models/role';

export const signUp = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, email, password, roles } = req.body;

  // const userFound = User.find({ email });

  const newUser = new User({
    userName,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    // a continuacion le indicamos que le haga un find a los roles que envíe el usuario
    const foundRoles = await role.find({ name: { $in: roles } });
    // le indicamos que guardamos el _id del rol y no el name
    newUser.roles = foundRoles.map(role => role._id);
  } else {
    const Role = await role.findOne({ name: 'user' });
    newUser.roles = [Role._id];
  }

  const savedUser = await newUser.save();
  console.log(newUser);

  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 86400, // 24 hrs
  });

  res.json({token});
};

export const signIn = async (req, res) => {

  const userFound = await User.findOne({ email: req.body.email }).populate('roles');

  if (!userFound) {
    return res.status(400).json({message: 'User not found'});
  }

  const validatePassword = await User.comparePassword(req.body.password, userFound.password);

  if (!validatePassword) return res.status(401).json({ token: null, message: 'invalid password' });

  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400,
  });

  console.log(userFound);

  res.json({token});
};

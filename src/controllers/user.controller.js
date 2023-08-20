import User from '../models/user';
import role from '../models/role';

export const createUser = async (req, res) => {
  const {
    userName,
    email,
    password,
    roles,
  } = req.body;

  const newUser = new User({
    // eslint-disable-next-line max-len
    userName, email, password: await User.encryptPassword(password),
  });

  if (roles) {
    newUser.roles = await role.getRole(req.body.roles, role);
  } else {
    newUser.roles = await role.defaultRole(role);
  }

  const userSaved = await newUser.save();
  res.status(201).json(userSaved);
};

export const getUsers = async (req, res) => {
  const users = await User.find().populate('roles');
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
  // aqui desectructuramos el userId en lo que nos llegue por params
  const { userId } = req.params;

  if (req.body.roles) {
    const foundRoles = await role.find({ name: { $in: req.body.roles } });
    req.body.roles = foundRoles.map(roleName => roleName.id);
    // req.body.roles = req.body.roles.map((roleName) => mongoose.Types.ObjectId(roleName));
  }

  const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

  res.status(200).json(updateUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  await User.findByIdAndDelete(userId);

  const message = 'User deleted succesfully';

  return res.status(200).json(message);
};

import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';
import Role from '../models/role';

// eslint-disable-next-line import/prefer-default-export
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, config.SECRET);

    // a continuacion en el objeto request se guardara una nueva propiedad llamada userId
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' });
  }
};

export const moderator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'moderator') {
      next();
      return;
    }
  }

  // eslint-disable-next-line consistent-return
  return res.status(403).json({ message: 'Require moderator role' });
};

export const admin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
      return;
    }
  }

  // eslint-disable-next-line consistent-return
  return res.status(403).json({ message: 'Require admin role' });
};

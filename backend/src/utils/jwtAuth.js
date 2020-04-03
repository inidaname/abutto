import jwt from 'jsonwebtoken';
import { userModel } from '../models';
import { asyncHandler } from './helpers';

export const newToken = ({ id }) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '2W'
  });
};

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const secure = asyncHandler(async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Not Authorize to access this route' });
  }
  const token = bearer.split('Bearer ')[1].trim();
  const payload = await verifyToken(token);
  const user = await userModel
    .findById(payload.id)
    .lean()
    .exec();
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Not Authorize to access this route' });
  }
  req.user = user;
  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User with role of ${req.user.role} is Not Authorize to access this route`
      });
    }
    next();
  };
};

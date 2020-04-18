import { userModel } from '../models';
import { newToken } from '../utils/jwtAuth';
import { asyncHandler, convertNumber } from '../utils/helpers';

// @desc      create user
// @route     POST /api/auth/register
// @access    Public
export const createUser = asyncHandler(async (req, res) => {
  let user = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) {
    return res.status(401).json({
      message: 'Phone Number Already exit'
    });
  }

  req.body.phoneNumber = convertNumber(req.body.phoneNumber);
  const newUser = await userModel.create({ ...req.body });

  const token = newToken(newUser);
  return res.status(201).json({
    message: 'Created  successfully',
    token,
    data: newUser
  });
});

// @desc      user login
// @route     POST /api/login
// @access    Public
export const login = asyncHandler(async (req, res) => {
  let { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: 'Please enter phone number and password' });
  }

  phoneNumber = convertNumber(phoneNumber);
  const user = await userModel.findOne({ phoneNumber }).select('+password');
  if (!user) {
    return res.status(401).json({
      message: 'Invalid  combination'
    });
  }

  const match = await user.checkPassword(req.body.password);
  if (!match) {
    return res.status(401).json({
      message: 'Invalid phone number and password combination'
    });
  }

  const token = newToken(user);
  const data = user.toJSON();
  delete data.password;
  return res.status(200).json({
    message: 'SignIn successful',
    token,
    data
  });
});

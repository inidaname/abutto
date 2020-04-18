import { userModel } from '../models';
import { asyncHandler } from '../utils/helpers';

const generateToken = (userData) => {
  const { _id: userId, email, permissions = [] } = userData;
  const secretPhrase = Buffer.from(process.env.JWT_SECRET || 'our little secret', 'base64');
  const token = jwt.sign({ userId, email, permissions }, secretPhrase, { expiresIn: '24h' });

  return token;
};


const authCtrl = {
  // @desc      create user
  // @route     POST /api/v1/auth/register
  // @access    Public
  register: asyncHandler(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: 'Duplicate Error: User already exists'
      });
    }

    const newUser = await userModel.create({ ...req.body });
    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'Registration successful',      
      data: {
        userId: newUser._id,
        token,
        email: newUser.email
      }
    });

  }),

  // @desc      user login
  // @route     POST /api/v1/auth/login
  // @access    Public
  login: asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password required' });
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password provided'
      });
    }

    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).json({
        message: 'Invalid email or password provided'
      });
    }

    const token = generateToken(user);
    const data = user.toJSON();
    delete data.password;
    return res.status(200).json({
      message: 'Login successful',      
      data: {
        token,
        userId: data._id,
        email: data.email
      }
    });
  })
};

export default authCtrl;

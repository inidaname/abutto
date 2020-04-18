import express from 'express';

// JWT Auth
import { secure, authorize } from '../utils/jwtAuth';

// middleware to filter result
import advanceFilter from '../utils/advanceFilter.js';

// import all for filtering
import { userModel } from '../models';

// Auth controller
import { createUser, login } from '../controllers/authController';

// User controller
import {
  getAllUsers,
  getUser,
  getUserByPhone,
  updateUser
} from '../controllers/userController';

// init express router
const router = express.Router();

// Home
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Abutto'
  });
});

/***************************************************
 *            Authentication Route                 *
 ***************************************************/
router.post('/register', createUser);
router.post('/login', login);

/***************************************************
 *                 Users Routes                    *
 ***************************************************/
router.get('/users', advanceFilter(userModel), getAllUsers);
router.get('/userphone/:phoneNumber', getUserByPhone);
router
  .route('/user/:id')
  .get(getUser)
  .put(secure, updateUser);


export default router;

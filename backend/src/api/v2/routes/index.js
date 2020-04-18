import express from 'express';
import exjwtModule from 'express-jwt';
import authRouter from './auth';

const router = express.Router();

// initialise jwt middleware
const secretphrase = Buffer.from(process.env.JWT_KEY || 'shhhItOurSuperDuperSecret', 'base64');
const exjwt = exjwtModule({
  secret: secretphrase,
});

// whitelist paths - no auth required
const whitelist = [
  '/',
  '/auth/login',
  '/auth/register'
];

// protect all routes
router.use(exjwt.unless({ 
  path: whitelist, 
  useOriginalUrl: false 
}));

// define routes here
router.use('/auth', authRouter);

// default response to base URL
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Abutto'});
});

export default router;

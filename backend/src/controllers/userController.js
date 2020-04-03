import { userModel } from '../models';
import { asyncHandler, convertNumber, genRandom } from '../utils/helpers';

export const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  res.status(200).json({
    message: 'success',
    data: user
  });

});

export const getAllUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.advanceFilter);
});

export const getUserByPhone = asyncHandler(async (req, res) => {
  let phoneNumber = convertNumber(req.params.phoneNumber);
  const user = await userModel
    .findOne({ phoneNumber })
    .lean()
    .exec();

  if (!user) {
    res.status(404).json({ message: 'User Does Not Exit' });
  }

  res.status(200).json({ data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
  let user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }

  // Make sure user is user owner
  if (
    user._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(401).json({
      message: `User ${req.user._id} is not authorized to updateAds ${user._id}`
    });
  }

  user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});


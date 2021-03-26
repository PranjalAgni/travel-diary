const { Router } = require('express');

const Users = require('../models/Users');
const { formatResponse, asyncHandler } = require('../utils/express');
const { omitKey } = require('../utils/lodash');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const users = await Users.find().lean();
    return formatResponse(
      res,
      omitKey(users, ['password', 'createdAt', 'updatedAt'])
    );
  })
);

router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const user = new Users(req.body);
    const createdUser = await user.save();
    const sanatizedResponse = createdUser.toObject();
    delete sanatizedResponse.password;
    return formatResponse(res, sanatizedResponse);
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    return formatResponse(res, { token });
  })
);

module.exports = router;

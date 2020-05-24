const { Router } = require('express');

const Users = require('../models/Users');
const { formatResponse } = require('../utils/responseFormatter');
const { omitKey } = require('../utils/lodash');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.find().lean();
    formatResponse(res, omitKey(users, ['password', 'createdAt', 'updatedAt']));
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const user = new Users(req.body);
    const createdUser = await user.save();
    const sanatizedResponse = createdUser.toObject();
    delete sanatizedResponse.password;
    formatResponse(res, sanatizedResponse);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    formatResponse(res, { token });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

module.exports = router;

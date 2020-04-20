const { Router } = require('express');

const Users = require('../models/Users');

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = new Users(req.body);
    const createdUser = await user.save();
    const sanatizedResponse = createdUser.toObject();
    delete sanatizedResponse.password;
    res.json(sanatizedResponse);
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
    res.json({
      status: 'Success',
      message: 'Login'
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

module.exports = router;

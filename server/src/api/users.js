const { Router } = require('express');

const Users = require('../models/Users');

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = new Users(req.body);
    const createdUser = await user.save();
    res.json(createdUser);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

module.exports = router;

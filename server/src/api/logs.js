const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const SpotLog = require('../models/SpotLog');

const router = Router();

const rateTimeDelay = process.env.NODE_ENV === 'production' ? 20 * 1000 : 1; // 20 sec
const createLogsLimiter = rateLimit({
  store: new MongoStore({
    uri: process.env.MONGODB_URL,
    expireTimeMs: rateTimeDelay
  }),
  windowMs: rateTimeDelay,
  max: 100
});

router.get('/', async (req, res, next) => {
  try {
    const spotLogs = await SpotLog.find();
    res.json(spotLogs);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

router.post('/', createLogsLimiter, async (req, res, next) => {
  try {
    const spotLog = new SpotLog(req.body);
    const createdEntry = await spotLog.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

router.get('/date', async (req, res, next) => {
  try {
    const endDate = new Date();
    const startDate = new Date(2020, 01, 15);
    const spotLogEntry = await SpotLog.find({
      visitDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean();
    res.json(spotLogEntry);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

module.exports = router;

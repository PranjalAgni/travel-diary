const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const LogEntry = require('../models/LogEntry');

const router = Router();

const rateTimeDelay = 20 * 1000; // 20 sec
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
    const logEntries = await LogEntry.find();
    res.json(logEntries);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

router.post('/', createLogsLimiter, async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
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
    const logEntryByDate = await LogEntry.find({
      visitDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean();
    res.json(logEntryByDate);
  } catch (error) {
    if (error.name === 'ValidationError') res.status(422);
    next(error);
  }
});

module.exports = router;

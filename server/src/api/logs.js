const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const SpotLog = require('../models/SpotLog');
const { formatResponse, asyncHandler } = require('../utils/express');

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

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const spotLogs = await SpotLog.find();
    return formatResponse(res, spotLogs);
  })
);

router.post(
  '/',
  createLogsLimiter,
  asyncHandler(async (req, res, next) => {
    const spotLog = new SpotLog(req.body);
    const createdEntry = await spotLog.save();
    return formatResponse(res, createdEntry);
  })
);

router.get(
  '/date',
  asyncHandler(async (req, res, next) => {
    const endDate = new Date();
    const startDate = new Date(2020, 01, 15);
    const spotLogEntry = await SpotLog.find({
      visitDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean();

    return formatResponse(res, spotLogEntry);
  })
);

module.exports = router;

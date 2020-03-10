import OrbbLogs from '../models/OrbbLogs';

export default async (req, res, next) => {
  //
  // WATCHER - CHECK LOGS
  //
  const checkLogs = await OrbbLogs.findOne({
    attributes: ['id'],
  });
  if (checkLogs == null) {
    return res.status(404).json({ error: 'NO `GAMES.LOG` PARSED YET.' });
  }
  return next();
};

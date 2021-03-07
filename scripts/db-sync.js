require('env');
const db = require('database/db');
const sync = require('database/sync');

const isDev = process.env.NODE_ENV !== 'production';

if (!isDev) {
  throw new Error('Sync script only works in the development environment.');
}

(async () => {
  try {
    await db.authenticate();
    sync();
    console.log('Sync successfully...');
  } catch (err) {
    console.error('Unable to sync:', err);
  }
})();

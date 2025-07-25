import app from './app';
import connect from './db';
import {env} from './env';

console.log('Server starting up...');
connect(env.DATABASE_URL)
  .then(() => {
    console.log('Connection to database established');
    app.listen(env.PORT, () => {
      console.log(`Server up and running on port ${env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Connection to database failed');
    console.error(err);
    process.exit(1);
  });

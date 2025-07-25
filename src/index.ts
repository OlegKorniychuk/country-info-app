import app from './app';
import dotenv from 'dotenv';
import connect from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoConnection = process.env.DATABASE_URL || '';

console.log('Server starting up...');
connect(mongoConnection)
  .then(() => {
    console.log('Connection to database established');
    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Connection to database failed');
    console.error(err);
    process.exit(1);
  });

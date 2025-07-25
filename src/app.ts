import express from 'express';
import logger from 'morgan';
import router from './routers/index';
import {errorHandler} from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

app.use('/api/v1', router);
app.use(errorHandler);

export default app;

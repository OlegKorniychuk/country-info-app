import express from 'express';
import logger from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

export default app;

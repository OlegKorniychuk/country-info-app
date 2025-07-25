import Router from 'express';
import countryRouter from './country.router';

const router = Router();

router.use('/countries', countryRouter);

export default router;

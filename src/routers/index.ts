import Router from 'express';
import countryRouter from './country.router';
import userRouter from './user.router';

const router = Router();

router.use('/countries', countryRouter);
router.use('/users', userRouter);

export default router;

import Router from 'express';
import userController from '../controlers/user.controller';

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', userController.createuser);
userRouter.post('/:userId/calendar/holidays', userController.saveHolidays);

export default userRouter;

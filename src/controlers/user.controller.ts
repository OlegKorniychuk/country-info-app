import {NextFunction, Request, Response} from 'express';
import {IUser} from '../models/user.model';
import countryService from '../services/country/country.service';
import userService from '../services/user/user.service';
import {validateCreateuser, validateSaveHolidays} from '../services/user/user.validate';
import {FetchResponse} from '../types/fetchResponse.type';
import {Holiday} from '../types/holiday.type';
import {AppError} from '../utils/appErrors';
import {catchError} from '../utils/catchError';

class UserController {
  public createuser = catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {login} = validateCreateuser.parse(req.body);

      const newUser: IUser = await userService.createUser(login);

      res.status(200).json({
        status: 'success',
        data: {
          newUser
        }
      });
    }
  );

  public getUsers = catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const users: IUser[] = await userService.getUsers();

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users
        }
      });
    }
  );

  public saveHolidays = catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {countryCode, year, holidays} = validateSaveHolidays.parse(req.body);

      const holidaysResponse: FetchResponse<Holiday[]> = await countryService.getHolidays(
        countryCode,
        year
      );

      if (holidaysResponse.error) {
        return next(new AppError('External API error', holidaysResponse.error));
      }

      const mappedHolidays = holidaysResponse
        .data!.filter(holiday => holidays.includes(holiday.name))
        .map(holiday => ({date: holiday.date, name: holiday.name}));

      const updatedUser: IUser = await userService.addHolidays(req.params.userId, mappedHolidays);

      res.status(200).json({
        status: 'success',
        data: {
          updatedUser
        }
      });
    }
  );
}

const userController = new UserController();

export default userController;

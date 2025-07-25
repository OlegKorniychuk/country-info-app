import User, {IUser} from 'models/user.model';
import {AppError} from 'utils/appErrors';

class UserService {
  public async createUser(login: string): Promise<IUser> {
    return await User.create({login});
  }

  public async getUsers(): Promise<IUser[]> {
    return await User.find({});
  }

  public async addHolidays(
    userId: string,
    holidays: {date: string; name: string}[]
  ): Promise<IUser> {
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new AppError('This user does not exist', 404);
    }

    for (const holiday of holidays) {
      const {date, name} = holiday;
      if (!user.calendar.get(date)?.includes(name)) {
        const currentEvents = user.calendar.get(date) || [];
        user.calendar.set(date, [...currentEvents, name]);
      }
    }

    await user.save();

    return user;
  }
}

const userService = new UserService();

export default userService;

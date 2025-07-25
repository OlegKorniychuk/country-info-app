import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
  login: string;
  calendar: Map<string, string[]>;
}

const userSchema = new Schema<IUser>({
  login: {type: String, required: true, unique: true},
  calendar: {
    type: Map,
    of: [String],
    default: {}
  }
});

const User = model<IUser>('User', userSchema);

export default User;

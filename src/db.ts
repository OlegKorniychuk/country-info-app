import mongoose from 'mongoose';

const connect = async (connectionString: string) => {
  await mongoose.connect(connectionString);
};

export default connect;

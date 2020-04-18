import mongoose from 'mongoose';

const databaseConnection = async () => {
  const conn = await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', err => {
    console.error(`Database connection error  ${err.message}`);
  });

  console.log(`${conn.connection.name} database connected on ${conn.connection.host} PORT ${conn.connection.port}`);
};

export default databaseConnection;

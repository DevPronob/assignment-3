import app from './app';
import mongoose from 'mongoose';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

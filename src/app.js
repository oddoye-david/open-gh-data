import 'babel-polyfill';
import mongoose from 'mongoose';

import { initializeServer } from './server';

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true },
    );

    const server = await initializeServer();
    // Start the server
    await server.start();

    console.log(`
==================================================
    Server running on port ${server.info.port}
==================================================
      `);
  } catch (error) {
    console.error(error);
    throw error;
  }
})();

import { connectToTestDB } from '.';
import { initializeServer } from '../../server';

(async () => {
  const server = await initializeServer();
  global.testServer = server;
  await connectToTestDB();
})();

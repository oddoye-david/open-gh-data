import mongoose from 'mongoose';

(async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/open-gh-data-test',
    { useNewUrlParser: true },
  );
})();

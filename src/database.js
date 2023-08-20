import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost/companydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-unused-vars
  .then((db) => console.log('Succesfully conected to the database'))
  .catch((error) => console.log(error));

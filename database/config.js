const mongoose = require('mongoose');

const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    console.log('DB On!');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error while trying to connect to DB');
  }

}

module.exports = { dbConnection };
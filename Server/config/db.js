const mongoose = require('mongoose');

const connect_DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/budget_tracker', {
    });

    console.log('MongoDB Connected: ' + conn.connection.host);
    console.log('Database Name: ' + conn.connection.name);
  } catch (error) {
    console.error('Database Connection Error:');
    console.error(error);
    process.exit(1);
  }
};

module.exports = connect_DB;
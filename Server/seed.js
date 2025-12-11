const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
require('dotenv').config();

const connect_DB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/budget_tracker'
    );
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};


const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Transaction.deleteMany({});
    console.log('Cleared existing data...');

    const createdUsers = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        monthlyBudget: 3000,
        currency: 'USD'
      }
    ]);

    console.log('Users inserted:', createdUsers.length);
    console.log('John Doe _id:', createdUsers[0]._id);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connect_DB().then(seedDatabase);

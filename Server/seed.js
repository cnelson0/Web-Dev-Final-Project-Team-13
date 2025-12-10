const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
require('dotenv').config();

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:17027/budget_tracker', {
      directConnection: true,
      serverSelectionTimeoutMS: 5000,
      authSource: 'admin'
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    monthlyBudget: 3000,
    currency: 'USD'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    monthlyBudget: 4500,
    currency: 'USD'
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    monthlyBudget: 2500,
    currency: 'USD'
  }
];

const transactions = [
  {
    description: 'Monthly Salary',
    amount: 3500,
    type: 'income',
    category: 'Salary',
    date: new Date('2024-12-01')
  },
  {
    description: 'Grocery Shopping',
    amount: 150.50,
    type: 'expense',
    category: 'Food',
    date: new Date('2024-12-05')
  },
  {
    description: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'Freelance',
    date: new Date('2024-12-10')
  },
  {
    description: 'Electric Bill',
    amount: 120,
    type: 'expense',
    category: 'Bills',
    date: new Date('2024-12-03')
  },
  {
    description: 'Gas Station',
    amount: 45.75,
    type: 'expense',
    category: 'Transportation',
    date: new Date('2024-12-07')
  },
  {
    description: 'Netflix Subscription',
    amount: 15.99,
    type: 'expense',
    category: 'Entertainment',
    date: new Date('2024-12-01')
  },
  {
    description: 'Restaurant',
    amount: 67.30,
    type: 'expense',
    category: 'Food',
    date: new Date('2024-12-08')
  },
  {
    description: 'Investment Returns',
    amount: 250,
    type: 'income',
    category: 'Investment',
    date: new Date('2024-12-15')
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Transaction.deleteMany({});
    console.log('Cleared existing data...');

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users inserted`);

    const transactionsWithUser = transactions.map((transaction, index) => ({
      ...transaction,
      user: createdUsers[index % createdUsers.length]._id
    }));

    const createdTransactions = await Transaction.insertMany(transactionsWithUser);
    console.log(`${createdTransactions.length} transactions inserted`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connect_DB().then(() => seedDatabase());
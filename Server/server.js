//Set up dependencies
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

//Set up Express and connect the database
const app = express();
connectDB();

//Attach the routing files
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

//Check that the server is connected properly
app.get('/', (req, res) => 
{
  res.json({ message: 'Welcome to the Budget Tracker' });
});

//Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
{
  console.log('Server running on port ' + PORT);
});
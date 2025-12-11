//Import relevant dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/api';
import TransactionList from '../components/TransactionList';

function HomePage() {
  
  //Establish important values for later
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [defaultUser, setDefaultUser] = useState(null);

  //Load default user and transactions
  useEffect(() => {
    API.getDefaultUser()
      .then(user => {
        setDefaultUser(user);
        API.getTransactions()
          .then(data => setTransactions(data || []))
          .catch(err => {
            console.error(err);
            setTransactions([]);
          });
      })
      .catch(err => {
        console.error(err);
        setTransactions([]);
      });
  }, []);

  //Return the styling and components for the HomePage
  return (
    <div style={{ padding: 20 }}>
      {/*Centered header and buttons*/}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1>Home Page</h1>
        <button onClick={() => navigate('/edit')} style={{ marginRight: 10 }}>
          Edit Transactions
        </button>
        <button onClick={() => navigate('/summary')}>View Summary</button>
      </div>

      {/*Transaction history*/}
      <h2>Transaction History</h2>
      {transactions.length === 0 && <div>No transaction history.</div>}
      <div style={{ textAlign: 'left' }}>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default HomePage;

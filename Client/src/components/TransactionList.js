//Import relevant dependencies
import React from 'react';
import './transactions.css';

//Initialize a list of transactions
const TransactionList = ({ transactions = [], remove }) => {

  //Check if the array is empty first
  if (!Array.isArray(transactions)) {
    console.error("TransactionList received non-array:", transactions);
    return <p>Error loading transactions.</p>;
  }

  //Otherwise return the list of transactions
  return (
    <div className="transaction-list">
      {transactions.length === 0 
      ? (<p>No transactions yet.</p>)
      : (
        transactions.map((t) => (
          <div key={t._id} className="transaction-item">
            <div>
              <strong>{t.description}</strong> — ${t.amount.toFixed(2)} ({t.type}) [{t.category}]
            </div>
            {/*Only show delete button if on EditPage since remove function doesn't exist for HomePage*/}
            {remove && <button style={{ marginLeft: 10 }} onClick={() => remove(t._id)}>Delete</button>}
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;

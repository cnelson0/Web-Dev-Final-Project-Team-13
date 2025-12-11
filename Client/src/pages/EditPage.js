import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/api';
import TransactionList from '../components/TransactionList';

function EditPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', category: '' });
  const [error, setError] = useState('');
  const [defaultUser, setDefaultUser] = useState(null);

  // Load transactions for a given user ID
  const loadTransactions = (userId) => {
    API.getTransactions()
      .then(data => {
        // Filter for this user just in case backend returns multiple users
        const userTransactions = data.filter(tx => tx.user?._id === userId);
        setTransactions(userTransactions || []);
      })
      .catch(err => {
        console.error(err);
        setTransactions([]);
      });
  };

  // Fetch default user on mount
  useEffect(() => {
    API.getDefaultUser()
      .then(user => setDefaultUser(user))
      .catch(err => console.error(err));
  }, []);

  // Load transactions whenever defaultUser is set
  useEffect(() => {
    if (defaultUser) loadTransactions(defaultUser._id);
  }, [defaultUser]);

  // Submit new transaction
  const submit = () => {
    if (!defaultUser) return;

    const payload = {
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: parseFloat(form.amount) >= 0 ? 'income' : 'expense',
      user: defaultUser._id
    };

    API.addtransaction(payload)
      .then(() => {
        setForm({ description: '', amount: '', category: '' });
        setError('');
        loadTransactions(defaultUser._id);
      })
      .catch(err => {
        console.error(err.response?.data || err);
        setError(err.response?.data?.error || 'Error adding transaction');
      });
  };

  // Delete transaction
  const remove = (id) => {
    API.deleteTransaction(id)
      .then(() => loadTransactions(defaultUser._id))
      .catch(err => console.error(err.response?.data || err));
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          style={{
            background: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 14px',
            borderRadius: 6,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Back
        </button>
        <h1 style={{ textAlign: 'center', flex: 1 }}>Edit Transactions</h1>
        <div style={{ width: 70 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
        <h3>Add Transaction</h3>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ width: 150 }}
          />
          <input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            style={{ width: 100 }}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{ width: 140 }}
          >
            <option value="">Select Category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <button onClick={submit} style={{ padding: '8px 14px' }}>Add</button>
        </div>
      </div>

      <h3 style={{ marginTop: 40, marginBottom: 10 }}>Existing Transactions</h3>
      <TransactionList transactions={transactions} showDelete={true} remove={remove} />
    </div>
  );
}

export default EditPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/api'
import TransactionList from '../components/TransactionList';


function HomePage() {
const navigate = useNavigate();
const [transactions, setTransactions] = useState([]);

useEffect(() => {
API.getTransactions()
.then((res) => setTransactions(res.data))
.catch(() => setTransactions([]));
}, []);


return (
<div style={{ padding: 20 }}>
<h1>Budget Tracker</h1>

<button onClick={() => navigate('/edit')}>Add / Edit Transactions</button>
<button onClick={() => navigate('/summary')} style={{ marginLeft: 10 }}>
Generate Summary
</button>

<h2 style={{ marginTop: 20 }}>Recent Transactions</h2>
<TransactionList
transactions={transactions}
onSelect={(t) => alert(`Description: ${t.description}\nAmount: ${t.amount}`)}
/>
</div>
);
}

export default HomePage;

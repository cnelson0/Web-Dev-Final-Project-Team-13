import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import * as API from '../services/api';

function SummaryPage() {
const navigate = useNavigate();
const [transactions, setTransactions] = useState([]);

useEffect(() => {
API.getTransactions().then((res) => setTransactions(res.data));
}, []);

const categories = {};
transactions.forEach((t) => {
categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
});

const data = {
labels: Object.keys(categories),
datasets: [{ label: 'Spending', data: Object.values(categories)}]
};

return (
<div style={{padding: 20}}>
<h1>Summary Report</h1>
<button onClick={() => navigate('/')}>Back</button>
<div style={{ width: '60%', marginTop: 20}}>
<Bar data={data}/>
</div>
</div>
);
}

export default SummaryPage;
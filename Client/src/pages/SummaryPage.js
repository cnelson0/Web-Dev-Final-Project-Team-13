import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/api';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

function SummaryPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.getTransactions()
      .then(data => setTransactions(data || []))
      .catch(err => console.error(err));
  }, []);

  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = 0;
    acc[t.category] += t.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Total per Category',
        data: Object.values(categoryTotals),
        backgroundColor: Object.values(categoryTotals).map(v => (v >= 0 ? 'green' : 'crimson')),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } },
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <button className="btn" onClick={() => navigate('/')}>Back</button>
      <h2 style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
        Total Spending/Earnings per Category
      </h2>
      <div style={{ height: '80vh', width: '80%', margin: '20px auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SummaryPage;

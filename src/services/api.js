import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTransactions = () =>
API.get('/transactions')
.then(res => res)
.catch(() => ({
data: [
    { _id: '1', description: 'Groceries', amount: -45.23, category: 'Food', date: '2025-01-10' },
    { _id: '2', description: 'Paycheck', amount: 1200.00, category: 'Income', date: '2025-01-09' },
    { _id: '3', description: 'Gas', amount: -32.50, category: 'Utilities', date: '2025-01-08' },
    { _id: '4', description: 'Movie Night', amount: -18.00, category: 'Entertainment', date: '2025-01-07' }   
]
}));

export const addtransaction = (data) => API.post('/transactions', data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export const updateTransactions = (id, data) => API.put(`/transactions/${id}`, data);
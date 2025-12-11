import axios from 'axios';

const API = axios.create({ baseURL: "/api" });

export const getTransactions = () => API.get('/transactions').then(res => res.data.data);

export const addtransaction = (data) => API.post('/transactions', data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export const updateTransactions = (id, data) => API.put(`/transactions/${id}`, data);

export const getDefaultUser = () =>
  axios.get('/api/users/default').then(res => res.data.data);

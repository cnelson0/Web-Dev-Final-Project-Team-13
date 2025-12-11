import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/api';

function EditPage() {
const navigate = useNavigate();
const [transactions, setTransactions] = useState([]);
const [form, setForm] = useState({ description: '', amount: '', category: '' });

const load = () => {
API.getTransactions().then((res) => setTransactions(res.data));
};

useEffect(() => {load(); }, []);

const submit = () => {
API.addtransaction(form).then(() => {
load();
setForm({ description: '', amount: '', category: '' });
});
};

const remove = (id) => {
API.deleteTransaction(id).then(() => load());
};

return (
<div style={{ padding: 20 }}>
<h1>Edit Transactions</h1>
<button onClick={() => navigate('/')}>Back</button>


<h3>Add Transaction</h3>
<input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
<input placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
<input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
<button onClick={submit}>Add</button>


<h3 style={{ marginTop: 20 }}>Existing</h3>
{transactions.map((t) => (
<div key={t._id} style={{ background: "white", padding: 10, marginBottom: 6 }}>
{t.description} — ${t.amount}
<button style={{ marginLeft: 10 }} onClick={() => remove(t._id)}>Delete</button>
</div>
))}
</div>
);
}

export default EditPage;
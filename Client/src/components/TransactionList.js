import React from "react";
import './transactions.css';

function TransactionList({ transactions, onSelect }) {
return (

<div className="transaction-list">
    {transactions.map((t) => (
<div
key={t._id}
className="transaction-item"
onClick={() => onSelect(t)}
>
<span>{t.description}</span>
<span style={{ fontWeight: 'bold', color: t.amount< 0 ? 'red' : 'green' }}>
${t.amount}
</span>
</div>
))}
</div>
);
}
export default TransactionList;

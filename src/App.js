import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import SummaryPage from './pages/SummaryPage';
import LoginPage from './pages/LoginPage';

function App() {
return (
<Routes>
<Route path="/" element={<HomePage/>} /> 
<Route path="/edit" element={<EditPage/>} />
<Route path="/summary" element={<SummaryPage/>} />
<Route path="/login" element={<LoginPage/>} />
</Routes>
);
}
export default App;
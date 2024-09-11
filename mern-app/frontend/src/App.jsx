import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Item Manager</h1>
        <Routes>
          <Route path="/" element={<ItemForm />} />
          <Route path="/items" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


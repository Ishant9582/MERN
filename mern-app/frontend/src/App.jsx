import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Item Manager</h1>
        <Routes>
          <Route path="/items" element={<ItemForm />} />
          <Route path="/" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



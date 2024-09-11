import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/itemSlice';
import { useNavigate } from 'react-router-dom';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name, description })).then(() => {
      navigate('/items'); // Navigate to item list after adding
    });
    setName('');
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item description"
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;


import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem, updateItem } from '../api/itemApi';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    };
    loadItems();
  }, []);

  const handleUpdate = async (id) => {
    await updateItem(id, { name: updatedName, description: updatedDescription });
    setEditMode(null);
    const updatedItems = await fetchItems();
    setItems(updatedItems); // Refresh items list
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    const updatedItems = await fetchItems();
    setItems(updatedItems); // Refresh items list
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-80 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Item List</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {editMode === item._id ? (
                <>
                  <input
                    type="text"
                    defaultValue={item.name}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 transition duration-200"
                  />
                  <input
                    type="text"
                    defaultValue={item.description}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 transition duration-200"
                  />
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 ease-in-out w-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <strong className="text-gray-800">{item.name}</strong>: <span className="text-gray-600">{item.description}</span>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => setEditMode(item._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/items')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mt-6 hover:bg-blue-600 transition duration-200 ease-in-out w-full"
        >
          Add More Items
        </button>
      </div>
    </div>
  );
};

export default ItemList;




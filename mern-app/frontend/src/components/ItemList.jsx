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
    <div className="max-w-md mx-auto">
      <ul className="bg-white p-6 rounded shadow-md">
        {items.map((item) => (
          <li key={item._id} className="mb-4">
            {editMode === item._id ? (
              <>
                <input
                  type="text"
                  defaultValue={item.name}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  defaultValue={item.description}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="border p-2 mb-2 w-full"
                />
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <strong>{item.name}</strong>: {item.description}
                <button
                  onClick={() => setEditMode(item._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add More Items
      </button>
    </div>
  );
};

export default ItemList;



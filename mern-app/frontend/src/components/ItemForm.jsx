import React from 'react';
import { useForm } from 'react-hook-form';
import { addItem } from '../api/itemApi';
import { useNavigate } from 'react-router-dom';

const ItemForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    await addItem(data);
    navigate('/'); // Navigate to item list after adding
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 via-red-500 to-yellow-500 animate-fade-in">
      <div className="max-w-md w-full bg-white bg-opacity-90 p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Item Name Field */}
          <div className="relative">
            <input
              type="text"
              {...register('name', { required: 'Item Name is required' })}
              placeholder="Item Name"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Item Description Field */}
          <div className="relative">
            <textarea
              type="text"
              {...register('description', { required: 'Description is required' })}
              placeholder="Item Description"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;






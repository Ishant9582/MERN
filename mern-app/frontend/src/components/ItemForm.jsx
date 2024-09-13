import React from 'react';
import { useForm } from 'react-hook-form';
import { addItem } from '../api/itemApi';
import { useNavigate } from 'react-router-dom';

const ItemForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data) ;
    await addItem(data);
    navigate('/items'); // Navigate to item list after adding
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <input
              type="text"
              {...register('name', { required: 'Item Name is required' })}
              placeholder="Item Name"
              className="border p-2 w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              placeholder="Item Description"
              className="border p-2 w-full"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;




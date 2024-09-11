import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for fetching, adding, deleting, and updating items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('http://localhost:5000/items');
  return response.data;
});

export const addItem = createAsyncThunk('items/addItem', async (newItem) => {
  const response = await axios.post('http://localhost:5000/items', newItem);
  return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await axios.delete(`http://localhost:5000/items/${id}`);
  return id;
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, name, description }) => {
  const response = await axios.put(`http://localhost:5000/items/${id}`, { name, description });
  return response.data;
});

// Slice
const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default itemSlice.reducer;

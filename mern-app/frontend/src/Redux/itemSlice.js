import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//These createAsyncThunk functions define the async actions for interacting with the backend API. 
//Each of these thunks returns a promise, and Redux automatically handles different states like pending, fulfilled, and rejected.
import axios from 'axios';
//A promise-based HTTP client for making requests to the backend (API).

// Async actions for fetching, adding, deleting, and updating items


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('http://localhost:5000/items');
  return response.data;
});
// fetchItems: This thunk is used to fetch all items from the API (GET /items).
// 'items/fetchItems': The action type identifier, used in reducers and for debugging.
// axios.get(): Sends a GET request to the API to fetch all items.
// response.data: Returns the data from the response, which is the list of items. This is automatically handled in the fulfilled state of the action.


export const addItem = createAsyncThunk('items/addItem', async (newItem) => {
  const response = await axios.post('http://localhost:5000/items', newItem);
  return response.data;
});
// addItem: Thunk used to add a new item (POST /items).
// newItem: The payload containing the new item's data, passed as an argument.
// axios.post(): Sends a POST request to the API to create a new item.
// response.data: Returns the newly created item from the API response.




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

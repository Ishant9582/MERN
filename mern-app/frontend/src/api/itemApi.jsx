import axios from 'axios';

const API_URL = 'http://localhost:5000/items'; // backend API URL
// API_URL stores the base URL for  API. In this case, it's pointing to localhost,


// Function to fetch items
export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
  // yha return krna bohut important
};

// Function to add a new item
export const addItem = async (item) => {
  console.log(item)
  const response = await axios.post(API_URL, item);
  console.log(response.data)
  // return response.data;
};
//response.data contains the result from the server (usually the newly created item or a success message).


// Function to update an item
export const updateItem = async (id, updatedItem) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem) ;
  //return response.data;
};
// axios.put(${API_URL}/${id}, updatedItem) sends the updatedItem object to the server and updates the item with the corresponding id.
// response.data will contain the updated item or a success message from the server.



// Function to delete an item
export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
//There’s no need to return anything here, as DELETE requests usually just remove the resource and don't return data.

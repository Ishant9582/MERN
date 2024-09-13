const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// cors: Middleware for enabling Cross-Origin Resource Sharing
//, which allows your frontend (possibly running on a different port) to make requests to your backend.

const app = express();
app.use(cors());
//Enables CORS to allow the server to handle requests from different origins (like requests from your frontend running on a different port).
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
//useNewUrlParser and useUnifiedTopology are options to ensure the connection uses the latest MongoDB features and avoids deprecation warnings.


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// routes

const Item = require('./models/Item');

// Create
app.post('/items', async (req, res) => {
  console.log(req.body)
  const newItem = new Item({ name: req.body.name, description: req.body.description });
  await newItem.save();
  res.json(newItem);
  // res.json(newItem): Responds with the newly created item in JSON format.
});
//req.body: Contains the data sent in the request (the item name and description). Since express.json() is used, this data is parsed from JSON.



// Read
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
  //res.json(items): Responds with the fetched items in JSON format.
});

// Update
app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { 
    name: req.body.name, 
    description: req.body.description 
  }, { new: true });
  res.json(updatedItem);
});
//The { new: true } option ensures that the updated item is returned, not the old version.

// Delete
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});



// // why we r using res.json() in place of res.send() ????
// // Sends a JSON response to the client:
// // When you use res.json(), you're telling the server to send a JSON-formatted response. JSON (JavaScript Object Notation)
//  is a lightweight data format that is easy 
// for both humans and machines to read and write, making it the standard format for exchanging data between the server and the client (like React).
// // Sets the correct headers automatic.ally:
// // res.json() not only sends the data but also sets the appropriate response headers (Content-Type: application/json). 
// This tells the client (like a browser or frontend framework) that the data being sent is in JSON format, so it can be parsed correctly.
// // Simplifies sending responses:
// // While you could technically use res.send() to send any data, including JSON, res.json() is designed specifically for JSON, 
// ensuring the data is correctly formatted and handled. It is more convenient and clear for this use case
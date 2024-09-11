const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// routes

const Item = require('./models/Item');

// Create
app.post('/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name, description: req.body.description });
  await newItem.save();
  res.json(newItem);
});

// Read
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Update
app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { 
    name: req.body.name, 
    description: req.body.description 
  }, { new: true });
  res.json(updatedItem);
});

// Delete
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

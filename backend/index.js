const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = 'db.json';
const DATA_FILE_user = 'user.json';
// const DATA_FILE_contact = 'user.json';
const DATA_FILE_contact = path.join(__dirname, 'contactUser.json');

app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

//helper to read and write the data 
const readDataUser = () => JSON.parse(fs.readFileSync(DATA_FILE_user));
const writeDataUser = (data) => fs.writeFileSync(DATA_FILE_user, JSON.stringify(data, null, 2));


// Endpoint to receive form data
app.post('/user', (req, res) => {
    console.log('tes');
    const data = readDataUser();
    const newItem = { id: Date.now(), ...req.body };
    data.push(newItem);
    writeDataUser(data);
    res.status(200).send({ message: 'Form data received successfully!' });
});
app.delete('/user/:id', (req, res) => {
    const data = readDataUser();
    const { id } = req.params;
    const filteredData = data.filter((item) => item.id != id);
    if (data.length === filteredData.length) return res.status(404).json({ message: 'Item not found' });
  
    writeDataUser(filteredData);
    res.status(204).send();
  });


// Helper to read and write JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Routes
app.get('/users', (req, res) => {
  res.json(readDataUser());
});
// Routes
app.get('/items', (req, res) => {
  res.json(readData());
});

app.get('/', (req, res) => {
    res.json({"message":"api running"});
});

app.post('/items', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const data = readData();
  const { id } = req.params;
  const index = data.findIndex((item) => item.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

app.delete('/items/:id', (req, res) => {
  const data = readData();
  const { id } = req.params;
  const filteredData = data.filter((item) => item.id != id);
  if (data.length === filteredData.length) return res.status(404).json({ message: 'Item not found' });

  writeData(filteredData);
  res.status(204).send();
});

// const readContactdata = () => JSON.parse(fs.readFileSync(DATA_FILE_contact));
// const writeContactData = (data) => fs.writeFileSync(DATA_FILE_contact, JSON.stringify(data, null, 2));

const readContactData = () => {
  try {
    // Check if the file exists
    if (!fs.existsSync(DATA_FILE_contact)) {
      return []; // Return an empty array if the file does not exist
    }
    return JSON.parse(fs.readFileSync(DATA_FILE_contact, 'utf-8'));
  } catch (error) {
    console.error('Error reading contact data:', error);
    return [];
  }
};

// Helper function to write contact data
const writeContactData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE_contact, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing contact data:', error);
  }
};
// COntact DAta 

app.post('/contactdata',(req,res)=>{
  const data = readContactData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeContactData(data);
  res.status(201).json(newItem);
  console.log(data);
});
app.get('/contactdata',(req,res)=>{
  res.json(readContactData());
});


// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



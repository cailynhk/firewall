const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS for templating
app.set('view engine', 'ejs');

// Define a schema and model for the 'admin' collection in the 'users' database
const adminSchema = new mongoose.Schema({
  download_url: String,
  longitude: Number,
  latitude: Number
}, { collection: 'admin', database: 'users' });

const Admin = mongoose.model('Admin', adminSchema, 'admin');

// Serve the main page
app.get('/', async (req, res) => {
  try {
    const admins = await Admin.find(); // Fetch all fields of the documents
    res.render('index', { entries: admins });
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Watch for MongoDB changes
  Admin.watch().on('change', (change) => {
    if (change.operationType === 'insert') {
      const { download_url, longitude, latitude } = change.fullDocument;
      socket.emit('newEntry', { download_url, longitude, latitude });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

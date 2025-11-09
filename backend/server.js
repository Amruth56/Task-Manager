const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db.js');

const app = express();
const port = process.env.PORT || 5000

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

// DB connect
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
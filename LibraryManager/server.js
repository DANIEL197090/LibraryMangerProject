const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount Routes
app.use('/api/v1/authors', require('./routes/authors'));
app.use('/api/v1/books', require('./routes/books'));
app.use('/api/v1/students', require('./routes/student'));
app.use('/api/v1/attendants', require('./routes/attendants'));
app.use('/api/v1/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the School Library Management API',
        api_documentation: 'Coming soon'
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} on port ${PORT}`);
});

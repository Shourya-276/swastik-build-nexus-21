const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/content');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:8081", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));
app.use(express.json());

// Routes
app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
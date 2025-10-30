const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Environment check
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing in your .env file');
  process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ✅ Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// ✅ Default route (for testing server)
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running! Use /api/students for API routes.');
});

// ✅ Error handling middleware (for unhandled errors)
app.use((err, req, res, next) => {
  console.error('❌ Unexpected server error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

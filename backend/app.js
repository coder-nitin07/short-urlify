const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { redirectUser } = require('./controllers/urlController');
const authRouter = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/url', urlRouter);
app.get('/:shortUrl', redirectUser); // Always put this last

app.get('/', (req, res) => {
  res.send('Short-urlify Project');
});

// ✅ Connect DB and THEN start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
};

startServer();
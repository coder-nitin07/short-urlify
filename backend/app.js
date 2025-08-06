const express = require('express');
const db = require('./config/db');
const { redirectUser } = require('./controllers/urlController');
const authRouter = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');
const app = express();
const cors = require('cors');
require('dotenv').config();

// DB Connection 
db();

// Use CORS middleware
app.use(cors());

// json
app.use(express.json());

// routes
app.get('/:shortUrl', redirectUser);
app.use('/auth', authRouter);
app.use('/url', urlRouter);

app.get('/', (req, res)=>{
    res.send('Short-urilify Project');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
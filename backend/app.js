const express = require('express');
const db = require('./config/db');
const app = express();
require('dotenv').config();

// DB Connection 
db();

// json
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Short-urilify Project');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
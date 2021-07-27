const functions = require("firebase-functions");

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

const User = require('./routes/user');

app.use(cors());
app.use(express.json())
app.use('/public', express.static('public'))
app.use(User);

app.listen(PORT,()=>{
    console.log("server runing",PORT);
})
const connectToMongo = require("./db");

const express = require('express');
const { application } = require("express");

connectToMongo();
const app = express()
const port = 3000

//Availaible routes
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

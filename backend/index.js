const connectToMongo = require("./db");
var cors = require('cors')

const express = require('express');
const { application } = require("express");
const path = require("path");

connectToMongo();
const app = express()
const port = 5000

//Availaible routes
app.use(express.json());
app.use(cors())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`iNotes backend listening at http://localhost:${port}`)
})

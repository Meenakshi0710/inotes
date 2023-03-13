const connectToMongo = require("./db");
var cors = require('cors')

const express = require('express');

const path = require("path");

const PORT = 5000

connectToMongo();


const app = express()

//Availaible routes
app.use(express.json());
app.use(cors())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`iNotes backend listening at http://localhost:${PORT}`)
})

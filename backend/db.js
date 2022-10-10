const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Meenakshi:Fug8qvBy8KCKJMG@notes.wmqtlhm.mongodb.net/Notes?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log("Connected to moongoose");
    })
}

module.exports = connectToMongo;



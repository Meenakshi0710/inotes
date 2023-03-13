
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://Meenakshi:Fug8qvBy8KCKJMG@notes.wmqtlhm.mongodb.net/Notes?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    
    })
    .then(()=>{
        console.log("Connected to moongoose");
    })
}

module.exports = connectToMongo;



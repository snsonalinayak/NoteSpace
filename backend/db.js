const mongoose =require('mongoose');
// const mongoURI ="mongodb://localhost:27017/"
const mongoURI ="mongodb://127.0.0.1/notespace"

// const connectToMongso =()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("conneted to Mongo Success=lly");

//     })
// }
const connectToMongo =async()=>{
    await mongoose.connect(mongoURI, await console.log("conneted to Mongo Successfully"))
}


module.exports =connectToMongo;
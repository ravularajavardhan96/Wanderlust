const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/sampleListing");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// const Listing=require("./models/sampleListing");

async function main(){
    await mongoose.connect(MONGO_URL);
}



main() 
.then(()=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err)
})

let initDb= async ()=>{
    await Listing.deleteMany({});
   initData.data = initData.data.map(obj=>({...obj , Owner:'67e96dbc2097aedb96e6f184'}));
    await Listing.insertMany(initData.data);
}

initDb();
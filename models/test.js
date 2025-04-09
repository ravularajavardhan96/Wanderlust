const mongoose = require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/demo";
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

let teacherSchema = new mongoose.Schema({
    name:String,
    age:Number
});

teacherSchema.post("findOneAndDelete",async(teacher)=>{

    console.log("This is being triggered");
    console.log(teacher);
})

let Teacher = mongoose.model("Teacher",teacherSchema);

let addTeacher = async ()=>{

   let newTeacher= await new Teacher({
        name:"Vamsi",
        age:21
    });
    await newTeacher.save();
}
// addTeacher();

// delTeacher();


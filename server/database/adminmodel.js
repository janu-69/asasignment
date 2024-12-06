const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log(err);
})

const adminschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const adminmodel=new mongoose.model("admin",adminschema)

module.exports=adminmodel;
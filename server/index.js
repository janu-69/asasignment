const express=require("express");
require('dotenv').config();
const cookieparser=require("cookie-parser")
const app=express();
const adminmodel=require("./database/adminmodel.js");
const employeemodel=require("./database/employeemodel.js");
const cors=require("cors")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const multer=require('multer');
const path=require("path");



app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('uploads'))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + (Math.random()*5) + path.extname(file.originalname))
    }
})

const upload =multer({
    storage:storage
});

const adminauth=async(req,res,next)=>{
   try {
    if(!req.headers.token){
        return res.send({message:"token missing"})
       }
       else{
        const verifydata=jwt.verify(req.headers.token,process.env.API_SECRET)
        console.log(verifydata);
        if(!verifydata){
            return res.send({message:"unauthorised access"})
        }
        else{
            const data=await adminmodel.findOne({email:verifydata.email})
            if(data){
                next();
            }
            else{
                return res.send({message:'not found'})
            }
        }
       }
   } catch (error) {
    return res.status(500).send({message:"unauthorised user"})
   }
}

app.post("/api/signup",async(req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    const data=await adminmodel.findOne({email:email})
    if(data){
        return res.send({message:"user already exist"})
    }
    else{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,result)=>{
                const admin=await adminmodel.create({
                    name,
                    email,
                    password:result,
                })
                if(admin){
                    return res.status(201).send({message:"admin created"})
                }
                else{
                    return res.send({message:"something wrong while creating"});
                }
            })
        })
    }
})


app.post("/api/login",async(req,res)=>{
    const {email,password}=req.body;
    const verifyemail=await adminmodel.findOne({email:email})
    if(verifyemail){
        bcrypt.compare(password,verifyemail.password,(err,result)=>{
            if(result){
                const payload = {
                    email: verifyemail.email,
                  };
                const token=jwt.sign(payload,process.env.API_SECRET,{expiresIn:'1h'})
                return res.send({message:"login success",token:token,name:verifyemail.name})
            }
            else{
                return res.send({message:"please enter the valid password"});
            }
        })
    }
    else{
       return res.send({message:"something went wrong"})
    }
})

app.post("/api/createemployee",adminauth,upload.single('image'),async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const {name,email,number,designation,gender,course}=req.body;
    if(!name || !email || !number || !designation || !gender || !course || !req.file.filename){
        return res.send({message:"please fill all the credentials"})
    }
    else{
        const data=await employeemodel.create({
            name,
            email,
            mobile:number,
            designation,
            gender,
            course,
            image:req.file.filename
        })
        console.log(data)
        if(data){
            return res.send({message:"employee created"})
        }
    }
  
})

app.get("/api/employeedetails",adminauth,async(req,res)=>{
    const data=await employeemodel.find();
    if(data){
        return res.send({data:data});
    }
    else{
        return res.send({message:"something went wrong"})
    }
})

app.post("/api/deleteemployee",adminauth,async(req,res)=>{
    console.log(req.body);
    const {id}=req.body
    console.log(id)
    const data=await employeemodel.findByIdAndDelete({_id:id})
    if(data){
        return res.send({message:"deleted"});
    }
    else{
        return res.send({message:"deletion falied"});
    }
})

app.put("/api/employeedetails/:id", adminauth, upload.single("image"), async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, course } = req.body;
      const employeeId = req.params.id;
  
      let updatedImage = req.body.image;
      if (req.file) {
        updatedImage = req.file.filename;
      }
  
      const updatedEmployee = await employeemodel.findByIdAndUpdate(
        employeeId,
        {
          name,
          email,
          mobile,
          designation,
          gender,
          course,
          image: updatedImage,
        },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      return res.status(200).json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating employee" });
    }
  });

app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
})
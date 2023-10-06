const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const EmployeeModel=require("/home/racitsolution/Documents/Login Register Page/server/models/employee.js")
const cookieParser=require("cookie-parser")

const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true


}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000/test/Collections")

const varifyUser=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.json("Token missing")
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json("error with token")
            }else{
                if(decoded.role==="admin"){
                    next()
                }else{
                    return res.json("not admin")
                }

            }
        })
    }
}
app.get("/dashboard",varifyUser,(req,res)=>{
    res.json("Success")
})
app.post('/login',(req,res)=>{
    const{email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({email:user.email,role:user.role},
                        "jwt-secret-key",{expiresIn:'1d'})
                        res.cookie("token",token)
                        return res.json({Status:"Success",role:user.role})

                }else{
                    return res.json("Password is incorrect")
                }
            })
    }else{
        res.json("No record exitsed")
    }
        
    })
    .catch(err=>res.json(err))

})
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then(hash=>{
    EmployeeModel.create({name,email,password:hash})
    .then(employees=>res.json("Success"))
    .catch(err=>res.json(err))
    }).catch(err=>res.json(err))
    

})
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
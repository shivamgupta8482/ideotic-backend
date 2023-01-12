const connection = require("./Config/db");
const {UserModel} = require("./Model/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors=require("cors");
app.use(cors());
//require("dotenv").config()

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

//signup of application-----------------------------------------------------------------------------------------------------
app.post("/signup", async (req, res) => {
    const { name,email,password } = req.body;
    let user_already_present = await UserModel.findOne({email});
    if(user_already_present) res.send({"message":"user already present"});
   else{
     bcrypt
      .hash(password, 7)
      .then(async function (hash) {
        const new_user = new UserModel({
           email:email,
           name:name,   
            password:hash
        });
        
        await new_user.save();
        res.send({"message":"sign up successful"});
      })
      .catch((err) => {
        res.send({"error":"some error occured"});
      });
   }
  });
//login----------------------------------------------------------------------------------------------------
  app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(!user) res.send({"message":"no such user exists"})
    else{
        const hashed_password = user.password;
    const user_id = user._id;
  
    bcrypt.compare(password, hashed_password, function(err, result) {
          if(err){
            res.send({"msg" : "Something went wrong, try again later"})
          }
          if(result){
            const token = jwt.sign({user_id}, "abcdef");  
            res.send({message : "Login successfull", token,user_id})
          }
          else{
            res.send({"msg" : "Login failed"})
          }
    });
    }
})



app.listen(8080, async()=>{
    try{
await connection;
console.log("connected to db sucessfully");
    }catch(err){
        console.log("not able to connect");

    }
})
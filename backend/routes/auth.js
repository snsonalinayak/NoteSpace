const express = require('express');
const User = require('../models/User');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');

const JWT_SECRET='Harryisagood$boy';

//ROUTE1: create a User using: POST "/api/auth/createuser" No login required
router.post('/createuser',[
    body('name',"Enter must be of min 5 characters").isLength({min:4}),
    body('email',"Enter a Valid Email").isEmail(),
    body('password',"Password must be of min 5 characters").isLength({min:5}),
], async (req, res) => {
    let success=false;
    // if there are errors,return bad request & the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){  
        return res.status(400).json({success,errors: errors.array()});  
    }

    // check wether user with this same email exists already
    try {
        
    
    let user=await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists."})
    }

    const salt = await bcrypt.genSaltSync(10);
    secPass= await bcrypt.hash(req.body.password,salt);

    //Create a New User
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
    });
    const data={
        user:{
            id: user.id
        }
    }

    const authtoken=jwt.sign(data,JWT_SECRET);

    // res.json(user);
    success=true;
    res.json({success,authtoken})
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
}
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error:'This email already has an account'})})
    // .catch(err=>res.json({error:"This email already has an account"}))
})
//ROUTE2: Authenticate a User using: POST "api/auth/login" No Login Required
router.post('/login',[
    body('email',"Enter a Valid Email").isEmail(),
    body('password',"Password cannot be blank.").exists(),
], async (req, res) => {
let success=false;
// if there are errors,return bad request & the errors
const errors= validationResult(req);
if(!errors.isEmpty()){  
    return res.status(400).json({errors: errors.array()});  
}

const {email,password}= req.body;
try{
let user= await User.findOne({email});
if(!user){
    return res.status(400).json({error:"Please try to login with correct credentials"})
}

const passwordCompare= await bcrypt.compare(password, user.password)
if(!passwordCompare){
    success=false;
    return res.status(400).json({success,error:"Please try to login with correct credentials"})

}

const data={
    user:{
        id: user.id
    }
}

const authtoken=jwt.sign(data,JWT_SECRET);
success= true;
res.json({success,authtoken})


}catch(error){
console.log(error.message);
res.status(500).send("Internal Server Error")
}

})


//ROUTE3: Get logged in as a User using: POST "api/auth/getsuer" Login Required
router.post('/getuser',fetchuser, async (req, res) => {
try {

    userId= req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
}
})
module.exports= router
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Registration (Signup)
exports.registerUser = async (req,res) => {
  const {name, email, password} = req.body;
  
  try{
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: 'User Already Exists'});
    }
    user = new User({ name, email, password});  

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();
    res.status(201).json({message: 'User registered successfully!'});
  } catch(error){
    res.status(500).json({message: 'Server error during registration'});
  }
};

// 2. User Login
exports.loginUser = async (req,res) => {
  const {email,password} = req.body;
  
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: 'Invalid Credentials'});
    }  

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid Credentials'});
    }

    const payload = {
      user:{
        id:user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn:'1h'},
      (err,token) => {
        if(err) throw err;
        res.json({token,
          user:{id: user.id, name: user.name, email: user.email}
        });
      }
    );
  }catch(error){
    res.status(500).json({ message: 'Server error during login' });
  }
};

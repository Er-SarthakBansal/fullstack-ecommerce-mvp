import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Enter Valid Details" });
  }
  // normalize Email - means trim space and convert to lower case
  const normalizedEmail = validator.normalizeEmail(email.trim());
  if (!validator.isEmail(normalizedEmail)) {
    return res.status(400).json({ message: "Enter Valid Email-id" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must contain atleast 6 characters" });
  }
  try {
    const alreadyRegistered = await User.findOne({ email: normalizedEmail });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email: email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error occur during signup"});
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Enter Valid Details" });
  }
  // normalize Email - means trim space and convert to lower case
  const normalizedEmail = validator.normalizeEmail(email.trim());
  if (!validator.isEmail(normalizedEmail)) {
    return res.status(400).json({ message: "Enter Valid Email-id" });
  }
  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User Not Registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '2h' };
    const token = jwt.sign(payload, secret, options);
    // generate jwt and return token
    res.status(200).json({
      message: "Login Successfull",
      email: user.email,
      token: token
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error occured during login"});
  }
};




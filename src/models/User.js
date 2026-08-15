import mongoose, { Schema } from "mongoose";
const userSchema = mongoose.Schema({
  // User,s Details
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true
  }
},{
    timestamps: true,
  });

export default mongoose.model('User',userSchema);
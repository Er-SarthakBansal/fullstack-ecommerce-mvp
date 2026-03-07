import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["winter", "daily", "festive", "accessory"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: Number,
  shortDescription: String,
  description: String,
  fabric: String,
  work: String,
  includes: String,
  
  image: {
    type: String,
    required: true
  },
  
  featured:{
    type: Boolean,
    default: false,
  }
},
  {
    timestamps: true,
  });

export default mongoose.model('Product',productSchema);
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["winter", "daily", "festive", "accessory"],
    required: true,
    index:true
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
    index: true
  }
},
  {
    timestamps: true,
  });
productSchema.index({name: "text"});
export default mongoose.model('Product',productSchema);
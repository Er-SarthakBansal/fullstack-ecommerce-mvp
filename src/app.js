import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils/path.js';
import dotenv from 'dotenv';

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'..','..','public')));

app.use(cors());
app.use(express.json());

// mongoose.connect(MONGO_URI).then(()=>{
// console.log("MongoDb Connected")}).catch(err=>{console.error(err)});

// app.use('/api/users',userRoutes);
// app.use('/api/products',productRoutes);
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env!");
}

mongoose.connect(MONGO_URI).then(()=>
  console.log("MongoDb Connected")).catch((err)=> console.log("DB error:",err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"..","..","public","index.html"));
});


app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);
// app.get('/products', async (req,res) => {
//   const products = await product.find();
//   res.render('product-listing', {products});
// });

// app.get('/products/1',(req,res)=>{
//   res.render('productDetail');
// });

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
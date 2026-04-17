import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils/path.js';
import dotenv from 'dotenv';

import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'..','..','public')));

app.use(cors());
app.use(express.json());

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


app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
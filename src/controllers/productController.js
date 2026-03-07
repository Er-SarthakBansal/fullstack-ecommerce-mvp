import Product from "../models/Product.js";
// Get all products
export const getAllProducts = async (req,res)=>{
  try{
    const { category, featured } = req.query;
    let filter = {};
    if(category)
      filter.category = category;
    if(featured)
      filter.featured = featured === "true";

    const products = await Product.find(filter).select("name price image category");
    console.log(products);
    res.status(200).json(products);
  }catch(error){
    res.status(500).json({message : error.message});
  }
};

// 2. GET a single product by ID
export const getProductById = async (req,res) => {
  try{
    // Find the product by the ID provided in the URL parameter
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({ message: 'Product Not Found' });
    }
    console.log(product);
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

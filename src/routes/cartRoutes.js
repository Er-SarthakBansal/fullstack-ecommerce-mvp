import express from 'express';
const router = express.Router();
import Cart from '../models/Cart.js';

router.post('/add',async (req,res)=>{
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({userId});

    if(!cart){
      cart = new Cart({
        userId,
        items: [{ productId, quantity:1}]
      });
    }else{
      const itemIndex = cart.items.findIndex(
          item => item.productId.toString() === productId
        );
      if(itemIndex > -1){
        cart.items[itemIndex].quantity +=1;
      }else{
        cart.items.push({productId,quantity:1});
      }
    }
    await cart.save();
    res.json({message: "Product added to cart" });
});

router.delete('/remove/:productId', async(req,res) => {
  const {productId} = req.params;
  try{
    await Cart.updateOne({userId: "user123"},{$pull: {items: {productId : productId}}});
    res.json({message: "Item removed from cart"});
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

router.get('/:userId', async(req,res)=>{
  const cart = await Cart.findOne({userId: req.params.userId}).populate("items.productId");
  res.json(cart);
});

export default router;
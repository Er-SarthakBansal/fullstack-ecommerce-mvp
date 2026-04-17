import Order from '../models/Order.js';
import Cart from '../models/cart.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const { userId, shippingAddress, paymentMethod } = req.body;
  if (!userId || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    let total = 0;
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order();
    order.user = userId;
    order.shippingAddress = shippingAddress;
    order.paymentMethod = paymentMethod;

    const productIds = cart.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length === 0) {
      return res.status(400).json({ message: "Product not found" });
    }
    const productMap = {};
    for (const product of products) {
      productMap[product._id.toString()] = product;
    }
    for (const item of cart.items) {
      let product = productMap[item.productId];
      if (!product) {
        return res.status(400).json({ message: "Product not exist" });
      }
      order.items.push({
        product: item.productId,
        priceAtOrder: product.price,
        quantity: item.quantity
      });
      total += product.price * item.quantity;
    }
    order.totalAmount = total;
    const savedOrder = await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId : savedOrder._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};
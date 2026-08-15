import Cart from '../models/Cart.js';

export const addItem = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity: 1 }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }
  await cart.save();
  res.json({ message: "Product added to cart" });
};

export const removeItem = async (req, res) => {
  const { productId } = req.params;
    const { userId } = req.user;
  try {
    console.log(productId);
    await Cart.updateOne({ userId: userId }, { $pull: { items: { productId: productId } } });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const showItems = async (req, res) => {
  const { userId } = req.user;
  const cart = await Cart.findOne({ userId: userId }).populate("items.productId");
  res.json(cart);
};
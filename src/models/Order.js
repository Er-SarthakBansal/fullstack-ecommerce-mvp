import mongoose from'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    priceAtOrder: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  shippingAddress:{
    type: String,
    required: true
  },
  paymentMethod:{
  type: String,
  enum:['Cash On Delivery','Online Payment'],
  default: 'Cash On Delivery'
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Placed',
    enum:['Placed','Processing','Shipped','Delivered','Cancelled']
  },
  totalAmount: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true,
});
export default mongoose.model('Order',orderSchema);
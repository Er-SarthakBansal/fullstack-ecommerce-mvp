const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    priceAtOrder: {
      type: Number,
      required: true,
    },
    customization: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum:['Pending','Processing','Shipped','Delivered','Cancelled']
  },
  totalAmount: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true,
});
module.exports = mongoose.model('Order',orderSchema);
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  let itemsPrice = 0;
  const verifiedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }
    itemsPrice += product.price * item.quantity;
    verifiedItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: item.quantity,
      color: item.color,
    });
  }

  const shippingPrice = itemsPrice > 2000 ? 0 : 99;
  const totalPrice = itemsPrice + shippingPrice;

  const order = new Order({
    user: req.user._id,
    orderItems: verifiedItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'Cash on Delivery',
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Decrement stock
  for (const item of verifiedItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  res.status(201).json(createdOrder);
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get single order by id (only owner)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json(order);
});

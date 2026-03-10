const Order = require('../models/Order');

const transformPayload = ({ numeroPedido, valorTotal, dataCriacao, items }) => ({
  orderId: numeroPedido,
  value: valorTotal,
  creationDate: new Date(dataCriacao),
  items: items.map(({ idItem, quantidadeItem, valorItem }) => ({
    productId: Number(idItem),
    quantity: quantidadeItem,
    price: valorItem,
  })),
});

const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(transformPayload(req.body));
    return res.status(201).json({ success: true, message: 'Pedido criado com sucesso.', data: order });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ creationDate: -1 });
    return res.status(200).json({ success: true, total: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      transformPayload(req.body),
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }

    return res.status(200).json({ success: true, message: 'Pedido atualizado com sucesso.', data: order });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: `Pedido '${req.params.orderId}' não encontrado.` });
    }

    return res.status(200).json({ success: true, message: `Pedido '${req.params.orderId}' deletado com sucesso.` });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };

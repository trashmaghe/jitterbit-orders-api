const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productId: { type: Number, required: [true, 'productId é obrigatório'] },
  quantity:  { type: Number, required: [true, 'quantity é obrigatório'], min: [1, 'quantity deve ser maior que 0'] },
  price:     { type: Number, required: [true, 'price é obrigatório'], min: [0, 'price não pode ser negativo'] },
});

const OrderSchema = new mongoose.Schema({
  orderId:      { type: String, required: [true, 'orderId é obrigatório'], unique: true, trim: true },
  value:        { type: Number, required: [true, 'value é obrigatório'], min: [0, 'value não pode ser negativo'] },
  creationDate: { type: Date,   required: [true, 'creationDate é obrigatório'] },
  items: {
    type: [ItemSchema],
    validate: { validator: (v) => Array.isArray(v) && v.length > 0, message: 'O pedido deve ter ao menos um item' },
  },
});

module.exports = mongoose.model('Order', OrderSchema);
